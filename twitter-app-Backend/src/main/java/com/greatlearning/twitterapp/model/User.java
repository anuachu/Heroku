package com.greatlearning.twitterapp.model;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.greatlearning.twitterapp.model.Tweet;
@Entity
@Table(name = "user")
public class User implements Comparable<User>, Serializable {
    static final long serialVersionUID = 1115533237396131226L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long userId;
    @Column(name = "user_handle")
    private String userHandle;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "password")
    private String password;
    @Column(name = "email_Address")
    private String emailAddress;
    @Column(name = "age")
    private int age;
    @Column(name = "created_date")
    private LocalDate createdDate;

    
    @Column(name = "cover_image")
    private String coverImage;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Tweet> tweets = new HashSet<>();
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_followings",    
                joinColumns = @JoinColumn(name = "user"),
                inverseJoinColumns = @JoinColumn(name = "following"))
    private Set<User> followings = new HashSet<>();
    
    @ManyToMany(mappedBy = "followings", cascade = CascadeType.ALL)
    private Set<User> followers = new HashSet<>();
    
     User() {}
     
    public User(String userHandle, String firstName, String lastName, String emailAddress, String password, LocalDate createdDate) {
        this.userHandle = userHandle;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.createdDate = createdDate;
    }
    public long getUserId() {
        return userId;
    }
    public String getUserHandle() {
        return userHandle;
    }
    
    public void setUserHandle(String userHandle) {
        this.userHandle = userHandle;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmailAddress() {
        return emailAddress;
    }
  
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
    public String getCoverImage() {
        return coverImage;
    }
    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }
     
    public LocalDate getCreatedDate() {
        return createdDate;
    }
    
    public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Set<Tweet> getTweets() {
        return tweets;
    }
	@JsonIgnore
    public Set<User> getFollowings() {
        return followings;
    }
	@JsonIgnore
    public Set<User> getFollowers() {
        return followers;
    }
    
    public void addTweet(Tweet tweet) {
        this.tweets.add(tweet);
        tweet.setUser(this);
    }
    
    public void removeTweet(Tweet tweet) {
        this.tweets.remove(tweet);
        tweet.setUser(this);
    }
	
    public void deleteAllTweets() {
		this.tweets.clear();
	}
	public Set<User> addFollowings(User tofollowing) {
		this.followings.add(tofollowing);
		tofollowing.addFollowers(this);
		return followings;
	}
	public void removeFollowings(User following) {
		this.followings.remove(following);
		following.removeFollowers(this);
	}
	
	private void addFollowers(User follower) {
		this.followers.add(follower);
	}
	private void removeFollowers(User follower) {
		this.followers.remove(follower);
	}
    @Override
    public int compareTo(User other) {
        return (int) (this.emailAddress.compareTo(other.getEmailAddress()) + this.userHandle.compareTo(other.getUserHandle()));
    }
	@Override
	public int hashCode() {
		return Objects.hash(age, coverImage, createdDate, emailAddress, firstName, lastName, password, tweets,
				userHandle);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return age == other.age && Objects.equals(coverImage, other.coverImage)
				&& Objects.equals(createdDate, other.createdDate) && Objects.equals(emailAddress, other.emailAddress)
				&& Objects.equals(firstName, other.firstName) && Objects.equals(lastName, other.lastName)
				&& Objects.equals(password, other.password) && Objects.equals(tweets, other.tweets)
				&& Objects.equals(userHandle, other.userHandle);
	}
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userHandle=" + userHandle + ", firstName=" + firstName + ", lastName="
				+ lastName + ", password=" + password + ", emailAddress=" + emailAddress + ", age=" + age
				+ ", followings=" + followings + ", followers=" + followers + "]";
	}
}