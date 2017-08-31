package com.booway.entity.bizc;
import java.io.Serializable;

import com.booway.entity.po.UapBug;
import com.sgcc.uap.mdd.runtime.base.BizCDefaultImpl;


public class UapBugBizc extends BizCDefaultImpl<UapBug, Serializable> implements IUapBugBizc {

	/**************** 标准方法执行前后事件,默认全部返回true *******************/
	@Override
	protected void afterDelete(UapBug uapbug) {
		// 自定义逻辑
	
	}

	@Override
	protected void afterAdd(UapBug uapbug) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeDelete(UapBug uapbug) {
		// 自定义逻辑
		
		return true;
	}

	@Override
	protected boolean beforeAdd(UapBug uapbug) {
		// 自定义逻辑
		return true;
	}

	@Override
	protected void afterUpdate(UapBug uapbug ,Serializable pk) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeUpdate(UapBug uapbug, Serializable pk) {
		// 自定义逻辑
		return true;
	}
	
}
