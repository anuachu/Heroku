package com.greatlearning.twitterapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greatlearning.twitterapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findById(long id);

}
