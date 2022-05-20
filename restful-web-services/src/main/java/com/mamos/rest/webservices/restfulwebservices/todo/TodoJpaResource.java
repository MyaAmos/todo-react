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
public class TodoJpaResource {
	
	@Autowired
	private TodoHardcodedService TodoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;

	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoJpaRepository.findByUsername(username);
		//return TodoService.findAll();
	}
	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		return todoJpaRepository.findById(id).get();
		//return TodoService.findById(id);
	}
	
	@DeleteMapping("/jpa/users/{username}/todos/{id}") 
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
		
		todoJpaRepository.deleteById(id);
		
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/jpa/users/{username}/todos/{id}") 
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo){
		Todo todoUpdated = todoJpaRepository.save(todo);
		
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
		
	}
	
	@PostMapping("/jpa/users/{username}/todos") 
	public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo){
		Todo createdTodo = todoJpaRepository.save(todo); 
		
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
