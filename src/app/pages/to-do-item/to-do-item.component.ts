import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToDo } from "../../classes/to-do";
import { TodoService } from "../../services/todo.service";
import { FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
  selector: "app-to-do-item",
  templateUrl: "./to-do-item.component.html",
  styleUrls: ["./to-do-item.component.css"]
})
export class ToDoItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public toDo: ToDo;
  public isNew: boolean = false;
  public isLoaded: boolean = false;
  public toDoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private api: TodoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id = params.get("id");
        if (id == null) {
          this.isNew = true;
          this.isLoaded = true;
          const params = { id: null, title: "", due: "", assignedTo: "", done: false };
          this.toDo = new ToDo(params);
          this.createForm();
        } else {
          this.subscriptions.push(
            this.api.getTodoById(id).subscribe(
              result => {
                this.toDo = result;
                this.createForm();
                this.isLoaded = true;
              },
              error => console.log(error)
            )
          );
        }
      })
    );
  }

  private createForm(): void {
    this.toDoForm = this.fb.group({
      title: [this.toDo.title, [Validators.required]],
      due: [this.toDo.due, [Validators.required]],
      assignedTo: [this.toDo.assignedTo, [Validators.required]],
      done: [this.toDo.done]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateTodo() {
    if (this.toDoForm.valid) {
      const { title, due, assignedTo, done } = this.toDoForm.value;
      if (this.isNew == true) {
        const params = { id: null, title, due, assignedTo, done };
        const toDo = new ToDo(params);
        this.subscriptions.push(
          this.api.addTodo(toDo).subscribe(result => {
            //this.toDo = toDo;
            //this.isNew = false;
            this.router.navigate(["toDoList"]);
          })
        );
      } else {
        const id = this.toDo.id;
        const params = { id, title, due, assignedTo, done };
        const toDo = new ToDo(params);
        this.subscriptions.push(
          this.api.editTodoById(id, toDo).subscribe(result => {
            this.router.navigate(["toDoList"]);
          })
        );
      }
    }
  }
}
