<?php
class Devices extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('whatsva');
        header("Content-Type: application/json");
        $this->load->model('messages_model');
    }
    public function getKeyDevice()
    {
        $uri = $this->uri->segment(4);
        if ($uri == 'key') {
            # key = api_key
            $result = $this->messages_model->getActive();
            $res = array('results' => $result);
            if ($res['results'] === 'no connect')
            {
                echo json_encode($res['results']);
            } 
            else { echo json_encode($result['api_key']); }
        }
        if( $uri == 'jid' ){
            # jid = device_name
            $result = $this->messages_model->getActive();
            $res = array('results' => $result);
            if ($res['results'] === 'no connect')
            {
                echo $res['results'];
            } 
            else { echo json_encode($result['device_name']); }
        }
    }
    public function getUrl_getway()
    {
        $result = $this->messages_model->getDomain_getway();
        $res = array('results' => $result);
        echo json_encode($result['domain']);
    }
}