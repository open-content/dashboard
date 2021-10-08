import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzMessageService } from "ng-zorro-antd/message";
import { StoryService } from "../story.service";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit {
  title: string = "Posts";
  description: string = "";

  selected: Array<number> = [];
  params: any = { status: undefined, q: undefined };
  isVisibleModal: boolean = false;

  stories: Array<any> = [];

  constructor(
    private story: StoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private toast: NzMessageService
  ) {}

  private _all(params: any = {}) {
    return this.story.all(params).subscribe((result: any) => {
      this.stories = result.rows;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.params = {
        q: params.q,
        status: params.status,
      };

      this._all(this.params);
    });
  }

  onSearch(clear: boolean = false) {
    if (clear) {
      this.params.q = undefined;
      return this.router.navigate(["/posts"], { queryParams: this.params });
    }

    if (this.params.q || this.params.status) {
      return this.router.navigate(["/posts"], { queryParams: this.params });
    }

    this.router.navigate(["/posts"]);
  }

  changeType(status: string = undefined) {
    this.params.status = status;

    if (this.params.status || this.params.q) {
      return this.router.navigate(["/stories"], { queryParams: this.params });
    }

    this.router.navigate(["/stories"]);
  }

  delete(id: string) {
    const messageId = this.toast.loading("Deleting story", { nzDuration: 0 })
      .messageId;

    this.story.delete(id).subscribe(
      () => {
        this.toast.remove(messageId);
        this.toast.success("Story deleted successfully.");
        this.stories = this.stories.filter((story: any) => story.id !== id);
      },
      () => {
        this.toast.remove(messageId);
        this.toast.error("Unable to delete story");
      }
    );
  }

  confirmDelete(id: string) {
    this.modal.confirm({
      nzTitle: "<h2>Are you sure want to delete this story?</h2>",
      nzContent:
        "<p class='px16'>This action is permanent and you will not be able to recover this post again.</p>",
      nzOkText: "Yes",
      nzCancelText: "No",
      nzOkType: "danger",
      nzIconType: null,
      nzOnOk: () => this.delete(id),
    });
  }
}
