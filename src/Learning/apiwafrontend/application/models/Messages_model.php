<?php

class Messages_model extends CI_Model
{
	private $_table = "tb_message";
	const SESSION_KEY = 'id';

  
  
    public function insert($instance_key,$message,$recipient,$type,$status,$date_time,$data_message)
	{
        $data = [
			'instance_key' => $instance_key,
            'message'   => $message,
			'recipient'=>$recipient,
            'type'=> $type,
			'status' => $status,
            'date_time'   => $date_time,
            'data_message'=> json_encode($data_message)
		];
     

        return $this->db->insert($this->_table, $data);
	}
	public function getCount()
	{
		if (!$this->session->has_userdata(self::SESSION_KEY)) {
            return null;
        }
        $user_id = $this->session->userdata(self::SESSION_KEY);

		$this->db->select("tb_message.*,tb_device.device_name");
		$this->db->from('tb_message');
		$this->db->join("tb_device","tb_message.instance_key = tb_device.api_key","left");
		$this->db->where("tb_device.id_user",$user_id);

        return 	$this->db->get()->num_rows();
	}
	public function getAll($start,$limit)
	{
		if (!$this->session->has_userdata(self::SESSION_KEY)) {
            return null;
        }
        $user_id = $this->session->userdata(self::SESSION_KEY);

		$this->db->select("tb_message.*,tb_device.device_name");
		$this->db->from('tb_message');
		$this->db->join("tb_device","tb_message.instance_key = tb_device.api_key","left");
		$this->db->where("tb_device.id_user",$user_id);
		$this->db->order_by("tb_message.id","desc");
		$this->db->limit($limit,$start);
        $query = $this->db->get();
		return $query->result();
	}
	public function getActive(){
		$this->db->select("tb_device.api_key, tb_device.device_name");
		$this->db->from('tb_device');
		$this->db->where("tb_device.`status`='2'");
		$query = $this->db->get();

		$numrows = $query->num_rows();
		if ($numrows > 0 ) {
			return $query->row_array();
		} else {
			return 'no connect';
		}
	}
	public function getDomain_getway(){
		$this->db->select("tb_setting.domain");
		$this->db->from('tb_setting');
		$this->db->where("tb_setting.`id`='1'");
		$query = $this->db->get();
		return $query->row_array();
	}
	
	
   
}