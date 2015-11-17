<?php
namespace Ucenter\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function jianli(){
    	 $this->display();
    }
    
    /**
     *保存基本信息
     */
    public function saveBase(){
    	$User = D('Ubase');
    }
    
    /**
     *保存期望
     */
    public function saveQiwang(){
    	 
    }
}