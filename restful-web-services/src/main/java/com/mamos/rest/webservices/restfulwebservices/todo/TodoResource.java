package com.mamos.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mamos.rest.webservices.restfulwebservices.todo.Todo;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource {
	
	@Autowired
	private TodoHardcodedService TodoService;

	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return TodoService.findAll();
	}
	
	@GetMapping("/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		return TodoService.findById(id);
	}
	
	@DeleteMapping("/users/{username}/todos/{id}") 
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
		
		Todo todo = TodoService.deleteById(id);
		if(todo!=null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/users/{username}/todos/{id}") 
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo){
		Todo todoUpdated = TodoService.save(todo);
		
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
		
	}
	
	@PostMapping("/users/{username}/todos") 
	public ResponseEntity<Void> updateTodo(@PathVariable String username, @RequestBody Todo todo){
		Todo createdTodo = TodoService.save(todo);
		
		//Location
		//Get current resource URL
		//{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
		
	}
}

/*
 * Retrieve all Todos for a user
 * GET /users/{user_name}/todos 
 * 
 * Delete a Todo of a user
 * DELETE /users/{user_name}/todos/{todo_id}
 * 
 * EDIT/Update a Todo
 * PUT /users/{user_name}/todos/{todo_id}
 * 
 * Create a new Todo
 * POST /users/{user_name}/todos/
 */
