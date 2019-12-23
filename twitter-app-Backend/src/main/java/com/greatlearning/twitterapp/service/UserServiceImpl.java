package com.greatlearning.twitterapp.service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.greatlearning.twitterapp.exception.InvalidUserException;
import com.greatlearning.twitterapp.model.Tweet;
import com.greatlearning.twitterapp.model.User;
import com.greatlearning.twitterapp.repository.TweetRepository;
import com.greatlearning.twitterapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TweetRepository tweetRepository;

	@Override
	public User saveUser(User user) {
		return this.userRepository.save(user);
	}
	
	@Override
	public User updateUser(long userId, User updateUser) {
		User user = null;
		try {
			user = validateUser(userId);
			user.setUserHandle(updateUser.getUserHandle());
			user.setFirstName(updateUser.getFirstName());
			user.setLastName(updateUser.getLastName());
			user.setAge(updateUser.getAge());
			user.setEmailAddress(updateUser.getEmailAddress());
			user.setCoverImage(updateUser.getCoverImage());
			user.setPassword(updateUser.getPassword());
			user = this.userRepository.save(user);
		} catch (InvalidUserException e) {
			e.printStackTrace();
		}
		return user;
	}
	
	@Override
	public 	Tweet addTweet(long userId, Tweet tweet) {
		User user = null;
		try {
			user = validateUser(userId);
			tweet.setUser(user);
		} catch (InvalidUserException e) {
			e.printStackTrace();
		}
		tweet = this.tweetRepository.save(tweet);
		return tweet;
	}
	
	@Override
	public Tweet deleteTweet(long tweetId) {
		try{
			Tweet tweet = validateTweet(tweetId);
			User user = validateTweet(tweetId).getUser();
			user.removeTweet(tweet);
			this.userRepository.save(user);
			this.tweetRepository.delete(tweet);
		}catch (InvalidUserException e) {
			e.printStackTrace();
		}
		return null;
		}


	public Set<Tweet> displayTweetById(long userId) {
	    User user = this.userRepository.findById(userId);
	    return user.getTweets();
	}
			
	
	@Override
	public List<User> listAll() {
		return this.userRepository.findAll();
	}

	@Override
	public User followUser(long userId, long followingId) {
		User user =null;
		User following = null;
		try {
			user = validateUser(userId);
			following = validateUser(followingId);
		     user.addFollowings(following);
		     user = this.userRepository.save(user);
		}catch (InvalidUserException e) {
			e.printStackTrace();
		}
		return user;
	}
	
	@Override
	public User unFollowUser(long userId, long followingId) {
		User user =null;
		User following = null;
		try {
			user = validateUser(userId);
			following = validateUser(followingId);
		     user.removeFollowings(following);
		     user = this.userRepository.save(user);
		}catch (InvalidUserException e) {
			e.printStackTrace();
		}
		return user;
	}
	
	@Override
    public Set<User> getFollowersByUserId(long userId) {
		User user = null;
		Set<User> followers = new HashSet<>();
		try {
			user = validateUser(userId);
			followers.addAll(user.getFollowers());
		} catch (InvalidUserException e) {
			e.printStackTrace();
		}
		return followers;
	}

    @Override
    public Set<User> getFollowingByUserId(long userId) {
    	User user = null;
		Set<User> followings = new HashSet<>();
		try {
			user = validateUser(userId);
			followings.addAll(user.getFollowings());
		} catch (InvalidUserException e) {
			e.printStackTrace();
		}
		return followings;
	}
	

	
	private User validateUser(Long userId) throws InvalidUserException {
		Optional<User> optionalUser = this.userRepository.findById(userId);
		if(optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			throw new InvalidUserException();
		}
	}
		
		private Tweet validateTweet(Long tweetId) throws InvalidUserException {
			Optional<Tweet> optionaltweet = this.tweetRepository.findById(tweetId);
			if(optionaltweet.isPresent()) {
				return optionaltweet.get();
			} else {
				throw new InvalidUserException();
			}
	}

	




}