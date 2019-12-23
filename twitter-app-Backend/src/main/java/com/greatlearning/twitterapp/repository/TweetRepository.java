package com.greatlearning.twitterapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greatlearning.twitterapp.model.Tweet;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long>{

}
