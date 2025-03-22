from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List

app = FastAPI()


origins = [
    "http://localhost:5173",  
    "http://localhost:3000",  
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskCreate(BaseModel):
    title: str = Field(...)

class Task(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        populate_by_name = True


tasks = []
current_id = 1

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return tasks

@app.post("/tasks", response_model=Task)
async def create_task(task: TaskCreate):
    global current_id
    new_task = {
        "id": current_id,
        "title": task.title,
        "completed": False
    }
    task_obj = Task(**new_task)
    tasks.append(task_obj)
    current_id += 1
    return task_obj

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int):
    for task in tasks:
        if task.id == task_id:
            task.completed = not task.completed
            return task
    raise HTTPException(status_code=404, detail="Task not found")
