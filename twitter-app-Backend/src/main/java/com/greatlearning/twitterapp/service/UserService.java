package com.greatlearning.twitterapp.service;

import java.util.List;

import java.util.Set;


import com.greatlearning.twitterapp.model.Tweet;
import com.greatlearning.twitterapp.model.User;

public interface UserService {
	
	User saveUser(User user);
	
	List<User> listAll();
	
	User updateUser(long userId, User user);
	
	Tweet addTweet(long userId, Tweet tweet);
		
	Set<Tweet> displayTweetById(long userId);
	
	User followUser(long userId, long followingId);

	Set<User> getFollowersByUserId(long userId);

	Set<User> getFollowingByUserId(long userId);

	User unFollowUser(long userId, long followingId);
	
	Tweet deleteTweet(long tweetId);

}
