package com.quora.QuoraBackEnd.Controllers;

import java.util.List;
import java.util.Set;

import org.hibernate.annotations.NaturalId;
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
@RequestMapping("/reply")
@CrossOrigin("*")
public class ReplyController {
	
	@Autowired
	private ReplyService replyService;
	
	@GetMapping("/getByQId/{qid}")
	public Set<Reply> getReplies(@PathVariable long qid){
		return this.replyService.getAllReplies(qid);
	}
	
}
