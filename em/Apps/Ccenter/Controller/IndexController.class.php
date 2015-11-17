<?php

namespace Ccenter\Controller;

use Think\Controller;

class IndexController extends Controller {
 
	/**
	 * 待处理简历
	 */
	public function canDealResumes(){
		$this->display ();
	}
	
	/**
	 * 已通知简历
	 */
	public function haveNoticeResumes(){
		$this->display ();
	}
	
	
	/**
	 * 发布简历
	 */
	public function create() {
		$this->display ();
	}
	
	/**
	 * 已发布的职位
	 */
	public function positions() {
		$this->display ();
	}
	
	/**
	 * 有效职位
	 */
	public function positionsOn() {
		$this->display ();
	}
	
	/**
	 * 已下线职位
	 */
	public function positionsOff() {
		$this->display ();
	}
	
	/**
	 * 待定简历
	 */
	public function canInterviewResumes() {
		$this->display ();
	}
	
	/**
	 * 已拒绝简历
	 */
	public function haveRefuseResumes() {
		$this->display ();
	}
	
	/**
	 * 自动过滤简历
	 */
	public function autoFilterResumes() {
		$this->display ();
	}
	
	/**
	 * 公司基本信息跳转
	 */
	public function indexFirst(){
		$this->display ();
	}
	
	/**
	 * 保存公司基本信息
	 */
	public function indexFirstCreate(){
		$a['success'] = 'success';
		$a['msg'] = '第一页保存成功!';
		$this->ajaxReturn($a);
	}
	/**
	 * 保存公司介绍
	 */
	public function indexSecSave(){
		$this->assign("title","公司信息");
		$this->assign("msg","公司信息保存成功，你可以开始发布职位了！");
		$this->display ("IndexCenterSuccess");
	}
	/**
	 * 公司介绍页面跳转
	 */
	public function indexSec(){
		$this->display ();
	}
}