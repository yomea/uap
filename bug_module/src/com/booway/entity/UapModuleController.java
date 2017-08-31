package com.booway.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.booway.entity.bizc.IUapModuleBizc;
import com.booway.entity.po.UapModule;
import com.sgcc.uap.rest.annotation.IdRequestBody;
import com.sgcc.uap.rest.annotation.ItemResponseBody;
import com.sgcc.uap.rest.annotation.ItemsRequestBody;
import com.sgcc.uap.rest.annotation.QueryRequestParam;
import com.sgcc.uap.rest.annotation.TreeResponseBody;
import com.sgcc.uap.rest.annotation.VoidResponseBody;
import com.sgcc.uap.rest.support.IDRequestObject;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.rest.support.RequestCondition;
import com.sgcc.uap.rest.support.TreeNode;

@Controller
@RequestMapping("/uapModule")
public class UapModuleController
{
    @Resource
    private IUapModuleBizc uapmoduleBizc;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ItemResponseBody
    List<UapModule> save(@ItemsRequestBody List<Map<String, String>> list)
    {
        Map<String, String> map = list.get(0);
        String id = map.get("id");
        String name = map.get("name");
        String projectId = map.get("projectId");
        UapModule um = new UapModule();
        um.setId(id);
        um.setName(name);
        um.setProjectId(projectId);
        if(id == null)
        {
            uapmoduleBizc.add(um);
        } else 
        {
            uapmoduleBizc.update(um, id);
        }
        List<UapModule> ums = new ArrayList<UapModule>();
        ums.add(um);
        return ums;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @VoidResponseBody
    Object delete(@IdRequestBody IDRequestObject idObject)
    {
        String[] ids = idObject.getIds();
        for (String id : ids)
        {
            uapmoduleBizc.delete(java.lang.String.valueOf(id));
        }
        return null;
    }

    @RequestMapping("/{id}")
    public @ItemResponseBody
    QueryResultObject get(@PathVariable String id)
    {
        UapModule uapmodule;
        if ("null".equals(id))
        {
            uapmodule = null;
        } else
        {
            uapmodule = uapmoduleBizc.get(java.lang.String.valueOf(id));
        }
        QueryResultObject qObject = new QueryResultObject();
        List<UapModule> items = new ArrayList<UapModule>();
        items.add(uapmodule);
        qObject.setItems(items);

        return qObject;
    }

    @RequestMapping("/")
    public @ItemResponseBody
    QueryResultObject query(@QueryRequestParam("params") RequestCondition queryCondition)
    {
        QueryResultObject queryResult = uapmoduleBizc.query(queryCondition);

        return queryResult;
    }
    
    @TreeResponseBody
    @RequestMapping("/tree/{id}")
    public List<TreeNode> listChildTree(@PathVariable String id)
    {
        return uapmoduleBizc.listChildTree(id);
    }

}
