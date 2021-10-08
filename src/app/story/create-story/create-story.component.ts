import { AfterViewInit, Component, OnInit, ViewChild, TemplateRef, OnDestroy } from "@angular/core";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Underline from '@editorjs/underline';
// import Wraning from '@editorjs/warning';
// import ImageTool from "@editorjs/image";
import SimpleImage from "@editorjs/simple-image";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { environment } from 'src/environments/environment';
import { StoryService } from '../story.service';

import { name, slug } from '../../app.regex';
import { toSlug } from '../../app.utility';
import { CategoryService } from "src/app/category/category.service";

@Component({
  selector: "app-create-story",
  templateUrl: "./create-story.component.html",
  styleUrls: ["./create-story.component.scss"],
})
export class CreateStoryComponent implements OnInit, AfterViewInit {
  private editor: EditorJS;
  private mediaUrl: string = environment.mediaUrl;
  private drawerRef: NzDrawerRef;

  storyForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl("", [Validators.required]),
    slug: new FormControl("", [Validators.required, Validators.pattern(slug)]),
    description: new FormControl(""),
    category: new FormControl(""),
    banner: new FormControl(""),
  });

  story: any = {
    title: '',
    content: [],
    tags: [],
  }

  saved: boolean = false;
  saving: boolean = false;
  blockIndex: number = 0;

  categories: Array<any> = [];

  @ViewChild('gallery', { static: true }) gallery: TemplateRef<any>;
  @ViewChild('publishStory') publishStory: TemplateRef<any>;

  private _modal: NzModalRef;

  constructor(
    private modal: NzModalService,
    private storyService: StoryService,
    private route: ActivatedRoute,
    private router: Router,
    private drawer: NzDrawerService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    const id: string = this.route.snapshot.params.id;

    if(!id || id === 'new') {
      return;
    }

    this.storyService.one(id).subscribe((res: any) => {

      this.story = {
        ...res
      };

      this.editor.isReady.then(() => {
        this.editor.blocks.render({
          blocks: this.story.content
        })
      });
    });
  }

  ngAfterViewInit() {

    // this.openDrawer();

    this.editor = new EditorJS({
      holder: "editor",
      placeholder: "Tell your story...",
      tools: {
        header: Header,
        list: List,
        quote: Quote,
        image: SimpleImage,
        table: Table,
        code: Code,
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        inlineCode: {
          class: InlineCode,
          shortcut: '`'
        },
        underline: Underline,
        // warning: {
        //   class: Wraning,
        //   inlineToolbar: true,
        //   shortcut: 'CMD+SHIFT+W',
        //   config: {
        //     titlePlaceholder: 'Warning title',
        //     messagePlaceholder: 'Warning message'
        //   }
        // },
      },
      onReady: () => {
        const toolbox: HTMLDivElement = document.querySelector('.ce-toolbar__content .ce-toolbox');

        const button: HTMLLIElement = document.createElement('li');
  
        button.classList.add('ce-toolbox__button');
        button.setAttribute('data-tool', 'image');
        button.innerHTML = '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150.242V79c0-18.778-15.222-34-34-34H79c-18.778 0-34 15.222-34 34v42.264l67.179-44.192 80.398 71.614 56.686-29.14L291 150.242zm-.345 51.622l-42.3-30.246-56.3 29.884-80.773-66.925L45 174.187V197c0 18.778 15.222 34 34 34h178c17.126 0 31.295-12.663 33.655-29.136zM79 0h178c43.63 0 79 35.37 79 79v118c0 43.63-35.37 79-79 79H79c-43.63 0-79-35.37-79-79V79C0 35.37 35.37 0 79 0z"/></svg>';
        
        button.addEventListener('click', (event: any) => this.handleImageClick(event))
        toolbox.appendChild(button);
      },
      onChange: () => {
        this.saved = false;
        this.autosave();
        this.blockIndex = this.editor.blocks.getCurrentBlockIndex();
      }
    });
  }

  handleImageClick(event: any) {
    this._modal = this.modal.create({
      nzWidth: 950,
      nzFooter: null,
      nzMask: false,
      nzContent: this.gallery,
      nzClosable: false,
      nzBodyStyle: {padding: '0'}
    });
  }

  onSelectMedia(media: Array<any>) {
    media.forEach((m: any) => {
      this.editor.blocks.insert('image', {
        url: `${this.mediaUrl}/${m.workspace.id}/${m.name}`,
        withBorder: false,
        withBackground: false,
        stretched: false
      }, {}, this.blockIndex);
    })
  }

  autosave() {
    if(this.editor.blocks.getBlocksCount() === 1 || this.saved) {
      return;
    }

    this.saving = true;
    this.editor.save().then((data: any) => {
      this.story.content = data.blocks;
      
      this.storyService.save(this.story).subscribe((result: any) => {

        if(!this.story.id) {
          this.router.navigateByUrl(`/stories/${result.id}`, {replaceUrl: true, preserveFragment: true});
          this.story.id = result.id;
        }
        
        this.saving = false;
        this.saved = true;
      });
    });
  }

  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    event.returnValue = false;
    this.editor.focus();
    return false;
  }

  closeGallery() {
    this._modal.close();
  }

  selectMedia(media: Array<any>) {
    console.log(media);
  }

  openDrawer() {
    this.drawerRef = this.drawer.create({
      nzContent: this.publishStory,
      nzClosable: false,
      nzMaskClosable: false
    });

    this._fetchCategories();

    this.editor.save().then((data: any) => {
      this.story.content = data.blocks;
    });

    this.storyForm.get('title').setValue(this.story.title);
    this.storyForm.get('description').setValue(this._getDescription());

    if(this.story.category) {
      this.storyForm.get('category').setValue(this.story.category.id);
    }

    this.storyForm.get('banner').setValue(this._getBanner());
  }

  closeDrawer() {
    this.drawerRef.close();
  }

  private _fetchCategories() {
    this.categoryService.all().subscribe((result: any) => {
      if(result.rows.length > 0) {
        this.categories = result.rows.map((cat: any) => ({
          id: cat.id,
          name: cat.name
        }))
      }
    })
  }

  private _getDescription(): string {
    const lines: Array<string> = this.story.content.map((content: any) => {
      if(content.type === 'paragraph') {
        return content.data.text;
      }
    });

    return lines.join(" ").slice(0, 255);
  }

  private _getBanner(): string {
    let first: string = '',
      streached: string = '';
    
    for(let block of this.story.content) {
      if(block.type !== 'image') {
        continue;
      }

      if(!first) {
        first = block.data.url;
      }

      if(block.data.stretched) {
       streached = block.data.url;
      }
    }

    return streached ? streached : first;
  }
}
