package com.greatlearning.twitterapp.exception;

public class InvalidUserException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidUserException() {
		super("ID is not matching with repository");
	}
}