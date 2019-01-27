package com.appsserver.server.repo;

import com.appsserver.server.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository <Message, Long>{
}
