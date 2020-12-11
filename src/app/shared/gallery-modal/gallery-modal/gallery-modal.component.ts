import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter, NgZone, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NgScrollbar } from 'ngx-scrollbar';
import { NzMessageService } from 'ng-zorro-antd/message';

import { MediaService } from '../../../gallery/media.service';
import { environment } from '../../../../environments/environment';

interface TCommon {
  rows: Array<any>;
  limit: number;
  page: number;
  count: number;
  loading: boolean;
  selected: Array<any>;
}

interface Preview {
  thumb: string;
  url: string;
  loading: boolean;
  width: number;
  height: number;
  caption?: string;
}

interface Result extends TCommon {
  deleting: boolean;
}

interface Search extends TCommon {
  term: string;
  shown: boolean;
  copying: boolean;
}

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  mediaUrl: string = environment.mediaUrl;

  accept: Array<string> = ['.jpg', '.png', '.gif', '.jpeg', '.JPG', '.PNG', '.GIF', '.JPEG'];
  multiple: boolean = true;

  @Input('selected') selected: Array<any> = [];

  result: Result = {
    rows: [],
    count: 0,
    page: 0,
    limit: 15,
    loading: true,
    selected: [],
    deleting: false
  }

  preview: Preview = {
    width: 0,
    height: 0,
    thumb: null,
    url: null,
    loading: false
  }

  uploader: any = {
    files: [],
    loading: false
  }

  search: Search = {
    rows: [],
    loading: false,
    shown: false,
    count: 0,
    page: 0,
    term: '',
    limit: 15,
    selected: [],
    copying: false
  }

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @ViewChild(NgScrollbar, { static: true }) scrollRef: NgScrollbar;

  @Output('onClose') onClose: EventEmitter<any> = new EventEmitter();
  @Output('onSelectMedia') onSelectMedia: EventEmitter<any> = new EventEmitter();

  private _scrollSubscription: Subscription;

  constructor(
    private mediaService: MediaService,
    private zone: NgZone,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.result.loading = true;
    this._fetch();
  }

  ngOnChanges() {
    
  }

  ngAfterViewInit() {
    this._scrollSubscription = this.scrollRef.scrolled.subscribe((event: any) => {
      const bottom: number = event.target.scrollHeight - event.target.clientHeight - 200;
      
      if(event.target.scrollTop > bottom && !this.result.loading) {
        this.zone.run(() => this.more());
      }
    })
  }

  select(file: any, type: string) {
    const index: number = this[type].selected.findIndex((id: any) => id === file.id);

    if(index !== -1) {
      return this[type].selected.splice(index, 1);
    }

    this[type].selected.push(file.id);
  }

  selectFile(event: any) {
    if(event.target.files.length > 0) {
      this.uploader.loading = true;
      this._addThumbnail(event.target.files).then(() => {
        this._upload();
      });
    }

    this.fileInput.nativeElement.value = "";
  }

  hideSearch() {
    this.search = {
      rows: [],
      loading: false,
      shown: false,
      term: '',
      limit: 15,
      page: 0,
      count: 0,
      selected: [],
      copying: false
    }
  }

  showSearch() {
    this.search.shown = true;
  }

  searchMedia(term: string) {

    if(!term || term.trim() === '') {
      return;
    }

    if(term.trim() === this.search.term) {
      return;
    }

    this.search.page = 1;
    this.search.term = term;
    this.search.loading = true;
    this.search.rows = [];
    this.search.count = 0;
    this._search();
  }

  more() {
    if(
      (!this.search.shown && this.result.count !== null && this.result.count <= this.result.rows.length) ||
      (this.search.shown && this.search.count !== null && this.search.count <= this.search.rows.length)
    ) {
      return;
    }

    if(this.search.shown) {
      this.search.loading = true;
      this.search.page++;
      this._search();
    } else {
      this.result.loading = true;
      this.result.page++;
      this._fetch();
    }
  }

  close() {
    this.onClose.emit();
  }

  openPreview(_file: any) {
    const file: any = {..._file};

    this.preview = {
      ...this.preview,
      width: file.width,
      height: file.height
    }

    if(!this.search.shown) {
      file.url = `${this.mediaUrl}/${file.path}`;
    }

    if(file.thumb) {
      this.preview.url = file.thumb;
      this.preview.loading = true;

      const img = new Image();

      img.onload = () => {
        this.preview.url = file.url;
        this.preview.loading = false;
      }

      return img.src = file.url;
    } else {
      this.preview.url = file.url;
    }
  }

  closePreview() {
    this.preview = {
      thumb: null,
      url: null,
      loading: false,
      width: 0,
      height: 0
    };
  }

  addToLibrary(file: any) {

    if(this.search.copying) {
      return this.message.warning('Add to library is in progress, please wait.');
    }

    this.search.copying = true;

    const files: Array<any> = file ? [file] : [...this.search.rows.filter((f: any) => this.search.selected.includes(f.id))];

    this.mediaService.copy(files).subscribe((result: any) => {
      this.search.copying = false;

      if(result.status) {
        this.message.success('Successfully added to your library.');
        this.search.selected = [];
        this.result.rows = [...result.inserted.map((m: any) => {
          return {
            ...m,
            path: `${m.workspace.id}/${m.name}`
          }
        }), ...this.result.rows];
      }
    }, (error: any) => {
      this.search.copying = false;
      this.message.error('Unable to add images to library.');
    });
  }

  delete(file: any) {
    
    if(this.result.deleting) {
      return this.message.warning('Deletion is in progress, please wait.');
    }

    this.result.deleting = true;

    this.mediaService.delete(file.id).subscribe((result: any) => {
      this.result.deleting = false;
      this.message.success('Media is deleted.');

      const index: number = this.result.rows.findIndex((f: any) => f.id === file.id);

      if(index !== -1) {
        this.result.rows.splice(index, 1);
        this.result.rows = [...this.result.rows];
      }
    });
  }

  emitSelected() {
    const media: Array<any> = this.result.rows.filter((m: any) => this.result.selected.includes(m.id));
    this.onSelectMedia.emit(media);
    this.onClose.emit();
  }

  private _addThumbnail(files: FileList) {
    const promises: Array<Promise<any>> = [];
    for(let i = 0; i < files.length; i++) {
      promises.push(new Promise((res: Function) => {
        const reader: FileReader = new FileReader();
        const file: File = files[i];

        reader.addEventListener('load', (event: any) => {
          const img: HTMLImageElement = new Image();
          img.src = event.target.result;
          img.onload = (_event: any) => {
            const image: HTMLImageElement = _event.path[0];
            this.uploader.files.push({
              width: image.width,
              height: image.height,
              file,
              type: file.type,
              url: event.target.result,
              uploading: true
            });
            return res();
          }
        });
        
        reader.readAsDataURL(file);
      }));
    }

    return Promise.all(promises);
  }

  private _upload() {
    const promises: Array<Promise<any>> = [];
    
    this.uploader.files.forEach((upload: any) => {
      if(upload.file) {
        promises.push(new Promise((res: Function) => {
          upload.uploading = true;

          const formData: FormData = new FormData();
          formData.append('file', upload.file);
          formData.append('width', upload.width);
          formData.append('height', upload.height);
          
          this.mediaService.upload(formData).subscribe((result: any) => {
            result.path = `${result.workspace.id}/${result.name}`;
            upload.loading = false;
            this.result.rows.unshift(result);
            res();
          });
        }))
      }
    });

    Promise.all(promises).then(() => {
      this.uploader.loading = false;
      this.uploader.files = [];
    });
  }

  private _fetch(params: any = {}) {
    this.mediaService.all(params).subscribe((result: any) => {
      this.result.loading = false;

      if(result.rows.length > 0) {
        result.rows = result.rows.map((media: any) => {
          return {
            ...media,
            path: `${media.workspace.id}/${media.name}`
          }
        })
      }

      if(this.result.page === 1) {
        return this.result = {
          ...this.result,
          ...result
        }
      }

      const {
        rows,
        ...extra
      } = result;

      this.result = {
        ...this.result,
        rows: [...this.result.rows, ...rows],
        ...extra
      }
    });
  }

  private _search() {
    this.mediaService.search(this.search.term, this.search.page).subscribe((result: any) => {      
      this.search.loading = false;

      if(this.search.page === 1) {
        return this.search = {
          ...this.search,
          ...result
        };
      }

      const {
        rows,
        ...extra
      } = result;

      this.search = {
        ...this.search,
        rows: [...this.search.rows, ...rows],
        ...extra
      }
    })
  }

  ngOnDestroy() {
    this._scrollSubscription.unsubscribe();
  }

}
