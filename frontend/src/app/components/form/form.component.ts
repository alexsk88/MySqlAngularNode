import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Games';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @HostBinding('class') classes = 'row'

  game: Game = {
    id: null,
    title: null,
    description: null,
    image: null,
    categoria_id: "1",
    created_at: null
  }

  editar = false;

  text_btn: String;

  constructor(private _gamesSV: GameService,
    private _params: ActivatedRoute) {

    _params.params.subscribe(
      route => {
        if (route.id) {

          console.log(route);
          this.getGame(route.id);
          this.text_btn = "Editar "
          this.editar = true;

        }
        else {
          console.log("No existe nada");
          this.text_btn = "Agregar"
        }

      }
    )

  }

  getGame(id: any) {
    this._gamesSV.getGame(id).subscribe(
      res => {
        console.log(res);
        this.game = res.data[0]
        console.log(this.game);


      }, err => console.log(err))
  }

  ngOnInit() {
  }

  addgame() {

    console.log(this.editar);

    if (this.editar) {

      delete this.game.created_at
      delete this.game.categoria_name

      console.log(this.game);

      this._gamesSV.edit(this.game.id, this.game).subscribe(
        res => {

          console.log(res);

        }, err => console.log("ERROE", err)

      )
    } else {
      this._gamesSV.save(this.game).subscribe(
        res => {

          console.log(res);

        }, err => console.log("ERROE", err)

      )
    }

  }

}
