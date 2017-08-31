package com.booway.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestClientException;

import com.booway.entity.bizc.IUapBugBizc;
import com.booway.entity.po.UapBug;
import com.sgcc.uap.mdd.runtime.meta.IMetadataService;
import com.sgcc.uap.mdd.runtime.utils.BeanUtils;
import com.sgcc.uap.mdd.runtime.utils.BodyReaderRequestWrapper;
import com.sgcc.uap.mdd.runtime.utils.HttpMessageConverter;
import com.sgcc.uap.mdd.runtime.validate.IValidateService;
import com.sgcc.uap.rest.annotation.ColumnRequestParam;
import com.sgcc.uap.rest.annotation.ColumnResponseBody;
import com.sgcc.uap.rest.annotation.IdRequestBody;
import com.sgcc.uap.rest.annotation.ItemResponseBody;
import com.sgcc.uap.rest.annotation.QueryRequestParam;
import com.sgcc.uap.rest.annotation.VoidResponseBody;
import com.sgcc.uap.rest.annotation.attribute.ViewAttributeData;
import com.sgcc.uap.rest.support.IDRequestObject;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.rest.support.RequestCondition;
import com.sgcc.uap.service.validator.ServiceValidatorBaseException;

@Controller
@RequestMapping("/uapBug")
public class UapBugController
{

    @Resource
    private IUapBugBizc uapbugBizc;
    
    @Resource
    private IValidateService validateService;
    
    @Resource
    private IMetadataService metadataService;
    
    @Resource
    private HttpMessageConverter coverter;
    
    @RequestMapping("/meta")
    public @ColumnResponseBody List<ViewAttributeData> getPropertyMeta(@ColumnRequestParam("params") String[] filterPropertys) throws Exception {
        List<ViewAttributeData> datas = null;
        datas = metadataService.getPropertyMeta(this.getClass(), "com.booway.entity.po.UapBug", filterPropertys);
        return datas;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ItemResponseBody
    List<UapBug> save(HttpServletRequest request_) throws Exception
    {
        /*Map<String, Object> map = list.get(0);
        String id = (String) map.get("id");
        String name = (String) map.get("name");
        String bugLevel = (String) map.get("bugLevel");
        String bugCreater = (String) map.get("bugCreater");
        String bugCtime = (String) map.get("bugCtime");
        String bugDesc = (String) map.get("bugDesc");
        String bugFile = (String) map.get("bugFile");
        String projectId = (String) map.get("projectId");
        String moduleId = (String) map.get("moduleId");
        UapBug ub = new UapBug();
        ub.setId(id);
        ub.setName(name);
        ub.setBugLevel(bugLevel);
        ub.setBugCreater(bugCreater);
        SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd");
        ub.setBugCtime(sdf.parse(bugCtime));
        ub.setBugDesc(bugDesc);
        ub.setBugFile(bugFile);
        ub.setProjectId(projectId);
        ub.setModuleId(moduleId);
        
        if(id == null)
        {
            uapbugBizc.add(ub);
        } else 
        {
            uapbugBizc.update(ub, id);
        }
        List<UapBug> uapBugs = new ArrayList<UapBug>();
        uapBugs.add(ub);*/
        try {
            //获取servlet API
            ServletServerHttpRequest servlet = new BodyReaderRequestWrapper(request_);
            //将模型转换为java对象
            UapBug[] uapBugs = coverter.converter(new UapBug[0], servlet);
            List<Map<String,Object>> changedProperies = coverter.converter(new ArrayList<Map<String,Object>>(), servlet);
            List<UapBug> voList = new ArrayList<UapBug>();
            //对所有属性进行后端校验
            validateService.validateWithException(UapBug.class, changedProperies);
            //遍历表单数据, 如果当前数据在数据库里存在, 则做修改, 否则做新增处理
            for (int i = 0; i < uapBugs.length; i++) {
                UapBug uapBug= uapBugs[i];
                Serializable pkValue = uapBug.getId();
                //覆盖某些不需要设置的属性
                Map<String,Object> changedProperty = coverter.flatHandle(UapBug.class,changedProperies.get(i));
                if (null != pkValue) {
                    UapBug old = uapbugBizc.get(pkValue);
                    //用changedProperty中的值填充old的属性
                    BeanUtils.populate(old, changedProperty);
                    
                    uapbugBizc.update(old, pkValue);
                    voList.add(uapBug);
    
                }else{
                    //填充属性
                    BeanUtils.populate(uapBug, changedProperty);
                    uapbugBizc.add(uapBug);
                    voList.add(uapBug);
                }
            }
            return voList;
        }catch (ServiceValidatorBaseException e) {
            throw e;
        }catch (Exception e) {
            throw new RestClientException("保存方法异常", e);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @VoidResponseBody
    Object delete(@IdRequestBody IDRequestObject idObject)
    {
        String[] ids = idObject.getIds();
        for (String id : ids)
        {
            uapbugBizc.delete(java.lang.String.valueOf(id));
        }
        return null;
    }

    @RequestMapping("/{id}")
    public @ItemResponseBody
    QueryResultObject get(@PathVariable String id)
    {
        UapBug uapbug;
        if ("null".equals(id))
        {
            uapbug = null;
        } else
        {
            uapbug = uapbugBizc.get(java.lang.String.valueOf(id));
        }
        QueryResultObject qObject = new QueryResultObject();
        List<UapBug> items = new ArrayList<UapBug>();
        items.add(uapbug);
        qObject.setItems(items);

        return qObject;
    }

    @RequestMapping("/")
    public @ItemResponseBody
    QueryResultObject query(@QueryRequestParam("params") RequestCondition queryCondition)
    {
        QueryResultObject queryResult = uapbugBizc.query(queryCondition);

        return queryResult;
    }

}
