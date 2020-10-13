import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postLoading: boolean;
  postLength: boolean;
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postLoading = true;
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
      this.postLoading = false;
    });
    if (!this.posts.length) {
      this.postLength = false;
    }
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  // tslint:disable-next-line:typedef
  remove(id) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

}
