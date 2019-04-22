import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data/data.service';
import { AccountService } from 'src/app/service/account/account.service';
import { TouchscreenService } from 'src/app/service/touchscreen/touchscreen.service';
import { UploadFileService } from 'src/app/service/upload-file/upload-file.service';
import { UserService } from '../../../service/user/user.service';
import { JIKNO_API_ROOT } from '../../../constants/constants';
import { SyncService } from '../../../service/sync/sync.service';
import { RandomNumberService } from 'src/app/service/random-number/random-number.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

	constructor(
		private dataService: DataService,
		public accountService: AccountService,
		public touchscreen: TouchscreenService,
		private uploadFileService: UploadFileService,
		private user: UserService,
		private syncService: SyncService,
		private randomNumberService: RandomNumberService,
	) {
		this.dataService.secondaryRoute = true;
	}

	ngOnInit() {
	}

	changeAvatar() {
		let input = (<HTMLInputElement>document.getElementById('mainAccountComponentFileChooser'))
		input.click();
	}

	uploadImage() {
		event.preventDefault();
		
		let image = (<HTMLInputElement>document.getElementById('mainAccountComponentFileChooser')).files[0]

		let newName = this.changeName(image.name);

		let file: FormData = new FormData();
		file.append('file', image, newName);

		this.uploadFileService.upload(file)
		.subscribe(res => {
			if (res.correct) {
				this.accountService.userInfo.avatar = `${JIKNO_API_ROOT}cloud/avatars/${newName}`;
				this.accountService.setUserInfo()
				.subscribe(res => {
					this.syncService.sync();
				})
			}
		})
	}

	changeName(name: string): string {
		const dotsTest = name;
		let lastDotIndex: number;
		dotsTest.split('').map((char, index) => {
			if (char === '.') lastDotIndex = index;
		})

		return `${this.user.getUser().email}${this.randomNumberService.getNumber(0, 90000)}${name.slice(lastDotIndex)}`
	}

}
