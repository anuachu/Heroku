package com.greatlearning.twitterapp.controller;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.greatlearning.twitterapp.model.Tweet;
import com.greatlearning.twitterapp.model.User;
import com.greatlearning.twitterapp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("api/v1/users/")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	@ResponseStatus(HttpStatus.CREATED)
	public User saveUser(@RequestBody User user) {
		User userSave = this.userService.saveUser(user);
		return userSave;
	}
	
	@GetMapping("/view")
	@ResponseStatus(HttpStatus.OK)
	List<User> getAllUser(@RequestBody User user){
		return this.userService.listAll();
	}
	
	@PutMapping("/{Id}/update")
	@ResponseStatus(HttpStatus.OK)
	public User updateUser(@PathVariable("Id") long userId, @RequestBody User updateUser) {
		User user = this.userService.updateUser(userId, updateUser);
		return user;
	}
		
	@PostMapping(value ="/{Id}/tweets/add",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	@ResponseStatus(HttpStatus.CREATED)
	public Tweet addTweet(@PathVariable("Id") long userId, @RequestBody Tweet tweet) {
		return this.userService.addTweet(userId, tweet);
	}
	
	@GetMapping("/{Id}/tweets")
	@ResponseStatus(HttpStatus.OK)
	public Set<Tweet> displayTweetById(@PathVariable("Id") long userId) {
		Set<Tweet> tweets =  this.userService.displayTweetById(userId);
		return tweets;
	}
	
	@DeleteMapping("/{Id}/deletetweet")
	 public Tweet deleteTweetById(@PathVariable("Id") long tweetId) {
		   return this.userService.deleteTweet(tweetId);
	}
	
	@PutMapping(value ="/{Id}/follow/{followingId}")
	@ResponseStatus(HttpStatus.OK)
	public User followUser(@PathVariable("Id") long userId,@PathVariable("followingId") long followingId) {
		return this.userService.followUser(userId, followingId);
	}
	
	@PutMapping(value ="/{Id}/unfollow/{followingId}")
	@ResponseStatus(HttpStatus.OK)
	public User unFollowUser(@PathVariable("Id") long userId,@PathVariable("followingId") long followingId) {
		return this.userService.unFollowUser(userId, followingId);
	}
	
	@GetMapping("/{id}/followers")
	public Set<User> getFollowersByUserId(@PathVariable("id") long userId){
        return this.userService.getFollowersByUserId(userId);
	}
	
	@GetMapping("/{id}/following")
	public Set<User> getFollowingByUserId(@PathVariable("id") long userId){
	    return this.userService.getFollowingByUserId(userId);
	}
	 
}
