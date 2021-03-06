import { Component, OnInit, Input } from '@angular/core';
import { AvatarService } from '../service/avatar.service';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.sass']
})
export class AvatarComponent implements OnInit {

	@Input() avatarSize: number;
	@Input() avatarClick = () => { console.log("Clicked on avatar") };
	@Input() shouldBounce = false;
	@Input() isCircle = true;
	@Input() showShadow: boolean;

	public image = '';
	public color = '#021c55';
	public letter = '';
	public error = false;
	public waiting = true;

	constructor(
		private avatar: AvatarService,
	) { }

	ngOnInit() {
		this.getAvatar();
	}

	getAvatar() {
		this.image = '';
		this.color = '#021c55';
		this.letter = '';
		this.error = false;
		this.waiting = true;
		this.showShadow = undefined;
		this.avatar.getAvatar().subscribe(res => {
			this.letter = res.letter;
			this.color = res.color;
			this.image = res.image;
			this.error = res.error;
			this.waiting = false;

			if (res.image == '' && this.showShadow == undefined) this.showShadow = true;
		});
	}

}