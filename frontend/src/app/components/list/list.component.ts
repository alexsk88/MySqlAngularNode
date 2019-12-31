import { Component, OnInit, HostBinding } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/Games';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @HostBinding('class') classes = 'row'
  private games: Game;

  constructor(private _gamesSV: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this._gamesSV.getGames().subscribe(
      res => {
        console.log(res);
        this.games = res
      })
  }

  delete(id) {
    console.log("se va a borrar el ID", id);

    this._gamesSV.delete(id).subscribe(
      res => {
        console.log(res);
        this.getGames()
      }
    )
  }

}
