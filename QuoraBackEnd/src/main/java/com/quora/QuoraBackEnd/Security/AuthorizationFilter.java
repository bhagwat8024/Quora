package com.quora.QuoraBackEnd.Security;

import java.io.IOException;
import java.lang.module.FindException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.weaver.ast.And;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

@Service
public class AuthorizationFilter extends OncePerRequestFilter{
	
	@Autowired
	JwtUtilHelper jwtUtilHelper;
	
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
	public static final String  AUTHORIZATION = "Authorization";
	public static final String BEARER = "Bearer ";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException{
		
		String requestTokenHeader = request.getHeader(AUTHORIZATION);
		String username,jwtToken;
		
		System.out.println("in filter "+requestTokenHeader+" "+request.getRequestURI());
		
		if(requestTokenHeader!=null && requestTokenHeader.startsWith(BEARER)) {
			jwtToken = requestTokenHeader.substring(7);
			
			try {
				username = jwtUtilHelper.extractUsername(jwtToken);
			}
			catch (Exception e) {
				throw new IOException("Exception");
			}
			
			UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
			
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
			else {
				System.out.println("Token is not Validated");
			}
		}
		System.out.println("un");
		filterChain.doFilter(request, response);
	}

}
