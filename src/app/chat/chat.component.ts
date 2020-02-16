import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChatMessageModel} from '../_models/chat-message.model';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageInput') message: ElementRef;
  messages: ChatMessageModel[] = [];

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
    })};

    this.http.get<ChatMessageModel[]>(
      BaseUrl.B1 + '/api/v1/chat', httpOptions
    ).subscribe(
      (data: ChatMessageModel[]) => {
        this.messages = data;
      },
      error => console.log(JSON.stringify(error))
    );
  }

  onSendMessage() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })};

    const body = 'message=' + this.message.nativeElement.value;
    this.http.post<ChatMessageModel>(
      BaseUrl.B1 + '/api/v1/chat', body, httpOptions
    ).subscribe(
      (data: ChatMessageModel) => {
        // this.messages.push(data);
        this.message.nativeElement.value = '';
        this.fetchMessages();
      },
      error => console.log(JSON.stringify(error))
    );
  }

}
