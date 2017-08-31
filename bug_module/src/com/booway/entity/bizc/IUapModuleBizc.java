package com.booway.entity.bizc;

import java.io.Serializable;
import java.util.List;

import com.booway.entity.po.UapModule;
import com.sgcc.uap.mdd.runtime.base.IBizC;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.rest.support.RequestCondition;
import com.sgcc.uap.rest.support.TreeNode;


public interface IUapModuleBizc extends IBizC<UapModule,Serializable>{

	public UapModule add(UapModule be);
	
	public void delete(Serializable id);
	
	public QueryResultObject query(RequestCondition queryCondition);
	
	public UapModule get(Serializable id);
	
	public void update(UapModule uapmodule,Serializable pk);
	
	public List<TreeNode> listChildTree(String id);
	
	
}
