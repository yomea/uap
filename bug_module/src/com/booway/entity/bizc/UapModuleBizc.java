package com.booway.entity.bizc;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.booway.entity.po.UapModule;
import com.sgcc.uap.mdd.runtime.base.BizCDefaultImpl;
import com.sgcc.uap.rest.support.TreeNode;

@SuppressWarnings("all")
public class UapModuleBizc extends BizCDefaultImpl<UapModule, Serializable> implements IUapModuleBizc {

	/**************** 标准方法执行前后事件,默认全部返回true *******************/
	@Override
	protected void afterDelete(UapModule uapmodule) {
		// 自定义逻辑
	
	}

	@Override
	protected void afterAdd(UapModule uapmodule) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeDelete(UapModule uapmodule) {
		// 自定义逻辑
		
		return true;
	}

	@Override
	protected boolean beforeAdd(UapModule uapmodule) {
		// 自定义逻辑
		return true;
	}

	@Override
	protected void afterUpdate(UapModule uapmodule ,Serializable pk) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeUpdate(UapModule uapmodule, Serializable pk) {
		// 自定义逻辑
		return true;
	}

    @Override
    public List<TreeNode> listChildTree(String id)
    {
        List<TreeNode> tns = new ArrayList<TreeNode>();
        List<UapModule> uapModules = this.hibernateDao.executeSqlQuery("select * from uap_module where project_id = ?", new Object[]{id}, UapModule.class);
        for (UapModule uapModule : uapModules)
        {
            TreeNode tn = new TreeNode();
            tn.setId(uapModule.getId());
            tn.setText(uapModule.getName());
            tn.setHasChildren(false);
            tns.add(tn);
        }
        return tns;
    }
	
}
