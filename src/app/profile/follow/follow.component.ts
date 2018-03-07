import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from "../../services/follow.service";
import {NgProgressService} from "ng2-progressbar";
import {NotifyService} from "../../services/notify.service";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  @Input() currentProfileId;
  public isFollowing: boolean;

  constructor(private followService: FollowService, public ngProgress: NgProgressService,
              public notify: NotifyService) { }

  ngOnInit() {
    this.followService.isFollowing(this.currentProfileId)
        .then(response => {
          this.isFollowing = response;
        });
  }

  follow() {
    this.ngProgress.start();
    this.followService.follow(this.currentProfileId).then(user => {
      this.ngProgress.done();
      this.isFollowing = true;
      this.notify.notify(`You are now following ${user.name}!`, 'success');
    });
  }

  unfollow(){
    this.ngProgress.start();
    this.followService.unfollow(this.currentProfileId).then(user => {
      this.ngProgress.done();
      this.isFollowing = false;
      this.notify.notify(`You unfollowed ${user.name}!`, 'success');
    });
  }

}
