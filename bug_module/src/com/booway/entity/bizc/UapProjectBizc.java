package com.booway.entity.bizc;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.booway.entity.po.UapProject;
import com.sgcc.uap.mdd.runtime.base.BizCDefaultImpl;
import com.sgcc.uap.rest.support.TreeNode;

@SuppressWarnings("all")
public class UapProjectBizc extends BizCDefaultImpl<UapProject, Serializable> implements IUapProjectBizc {

	/**************** 标准方法执行前后事件,默认全部返回true *******************/
	@Override
	protected void afterDelete(UapProject uapproject) {
		// 自定义逻辑
	
	}

	@Override
	protected void afterAdd(UapProject uapproject) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeDelete(UapProject uapproject) {
		// 自定义逻辑
		
		return true;
	}

	@Override
	protected boolean beforeAdd(UapProject uapproject) {
		// 自定义逻辑
		return true;
	}

	@Override
	protected void afterUpdate(UapProject uapproject ,Serializable pk) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeUpdate(UapProject uapproject, Serializable pk) {
		// 自定义逻辑
		return true;
	}

    @Override
    public List<TreeNode> listRootTree()
    {
        List<TreeNode> tns = new ArrayList<TreeNode>(); 
        List<UapProject> uapProjects = this.hibernateDao.executeSqlQuery("select * from uap_project", new Object[]{}, UapProject.class);
        for (UapProject uapProject : uapProjects)
        {
            TreeNode tn = new TreeNode();
            tn.setId(uapProject.getId());
            tn.setText(uapProject.getName());
            tn.setHasChildren(true);
            tns.add(tn);
        }
        return tns;
    }
	
}
