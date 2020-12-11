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

import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';

import { environment } from 'src/environments/environment';
import { StoryService } from '../story.service';

@Component({
  selector: "app-create-story",
  templateUrl: "./create-story.component.html",
  styleUrls: ["./create-story.component.scss"],
})
export class CreateStoryComponent implements OnInit, AfterViewInit {
  private editor: EditorJS;
  private mediaUrl: string = environment.mediaUrl;

  story: any = {
    title: "",
    content: [],
  };

  saved: boolean = false;
  saving: boolean = false;

  @ViewChild('gallery', { static: true }) gallery: TemplateRef<any>;

  private _modal: NzModalRef;

  constructor(
    private modal: NzModalService,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
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
      }
    });
  }

  handleImageClick(event: any) {
    this._modal = this.modal.create({
      nzWidth: 950,
      nzFooter: null,
      nzMask: false,
      nzContent: this.gallery,
      nzClosable: false
    });
  }

  onSelectMedia(media: Array<any>) {
    media.forEach((m: any) => {
      this.editor.blocks.insert('image', {
        url: `${this.mediaUrl}/${m.workspace.id}/${m.name}`,
        withBorder: false,
        withBackground: false,
        stretched: false
      });
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
        this.saving = false;
      })

      console.log(this.story);
      this.saved = true;
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
}
