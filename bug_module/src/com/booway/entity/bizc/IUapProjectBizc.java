package com.booway.entity.bizc;

import java.io.Serializable;
import java.util.List;

import com.booway.entity.po.UapProject;
import com.sgcc.uap.mdd.runtime.base.IBizC;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.rest.support.RequestCondition;
import com.sgcc.uap.rest.support.TreeNode;


public interface IUapProjectBizc extends IBizC<UapProject,Serializable>{

	public UapProject add(UapProject be);
	
	public void delete(Serializable id);
	
	public QueryResultObject query(RequestCondition queryCondition);
	
	public UapProject get(Serializable id);
	
	public void update(UapProject uapproject,Serializable pk);
	
	public List<TreeNode> listRootTree();
	
	
}
