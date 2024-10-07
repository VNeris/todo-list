import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../Tarefa';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tarefas: Tarefa[] = []

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

    this.taskService.getTasks().subscribe((data) => { this.tarefas = data; console.log(data); });

  }

  AddTask( tarefa: Tarefa) {

    this.taskService.AddTask(tarefa).subscribe((tarefa) => { this.tarefas.push(tarefa);this.tarefas.push(tarefa);})

  }


  deleteTask(tarefa: Tarefa){
        this.taskService.deleteTasks(tarefa).subscribe(() => {this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id)});
  }


  toggleConcluido(tarefa: Tarefa){
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe();
  }
}
