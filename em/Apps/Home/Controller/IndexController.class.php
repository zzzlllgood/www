<?php

namespace Home\Controller;

use Think\Controller;
use Org\Util\Date;
 

/**
 *
 * @author lei.yue
 *        
 */
class IndexController extends Controller {
	/**
	 * 首页
	 */
	public function index() {
		$this->assign ( 'data', C ( 'CATEGORY' ) );
		$this->display ();
	}
	
	/**
	 * 公司列表
	 */
	public function companyList() {
		$this->display ();
	}
	
	/**
	 * 职位列表
	 */
	public function jobList() {
		$this->display ();
	}
	
	/**
	 * 登录
	 */
	public function login() {
		$this->display ();
	}
	
	/**
	 * 注册
	 */
	public function register() {
		$this->display ();
	}
	
	/**
	 * 用户注册
	 */
	public function regSubmit() {
		$urg = M ("Urg");
		$urg->create();
		$urg->eid=keyGen();
		$urg->ucreate=date('Y-m-d H:i:s');
		$data['utype']=$urg->utype;
		$urg->add();
		
		$data ['resubmitToken'] = 1;
		if ($data['utype']==0) {
			$data ['content'] = __ROOT__ . '/index.php/Ucenter/Index/jianli.html';
		}else {
			$data ['content'] = __ROOT__ . '/index.php/Ccenter/Index/indexFirst.html';
		}
		$data ['success'] = 'success';
		$this->ajaxReturn ($data);
	}
}