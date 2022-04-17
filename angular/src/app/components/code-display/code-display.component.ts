import ClipBoard from 'src/utils/ClipBoard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.scss'],
})
export class CodeDisplayComponent implements OnInit {
  @Input() code!: string;
  @Input() name!: string;
  @Input() class!: string;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  copyText(text: string) {
    ClipBoard.copyTextToClipboard(text, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      this._snackBar.open(`${this.name} snippet copied`, "close", {
        duration: 3000,
      });
    });
  }
}
