package com.quora.QuoraBackEnd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quora.QuoraBackEnd.Model.Reply;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {

}
