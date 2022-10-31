package com.quora.QuoraBackEnd.Service;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Model.Reply;
import com.quora.QuoraBackEnd.Repository.QuestionRepository;
import com.quora.QuoraBackEnd.Repository.ReplyRepository;


@Service
public class ReplyService {

	@Autowired
	private ReplyRepository replyRepository;
	
	@Autowired
	private QuestionRepository questionRepository;
	
	public Reply addReply(Reply reply) {
		if(reply.getQuestion()==null || reply.getUser()==null)return null;
		Question question = reply.getQuestion();
		
		reply =  this.replyRepository.save(reply);
		question.addReplyCount();
		this.questionRepository.save(question);
		System.out.println("replies is"+question.getTotalReplies());
		return reply;
	}
	
	public void deleteReply(long id) {
		this.replyRepository.deleteById(id);
	}
	
	public Set<Reply> getAllReplies(long qid){
		return this.questionRepository.findById(qid).get().getReplies();
	}
	
}
