package com.quora.QuoraBackEnd.Controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Model.Reply;
import com.quora.QuoraBackEnd.Service.ReplyService;

@RestController
@CrossOrigin("*")
@RequestMapping("/privateReply")
public class ReplyPrivateController {
	@Autowired
	private ReplyService replyService;
	
	@PostMapping("/")
	public Reply addReply(@RequestBody Reply reply) {
		return this.replyService.addReply(reply);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteReply(@PathVariable long id) {
		this.replyService.deleteReply(id);
	}
}
