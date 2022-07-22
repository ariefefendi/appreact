<?php
namespace App\Controllers;
use App\Models\OltAktifasiModel;// change this.
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Exceptions\PageNotFoundException;
class OltAktifasiController extends BaseController
{
	use ResponseTrait;
	protected $model;
	protected $request;
	public function __construct()
	{
		$this->model = new OltAktifasiModel();// change this.
		$this->request = \Config\Services::request();
	}
	public function index() {
		echo $this->respondCreated(400);
	}
	public function getData() 
	{
		$res = $this->model->getDataAll();
		$status = $this->res_data(200, $res); $this->respond(200); echo json_encode($status);
	}
	public function insertMulti() {
		$data = json_decode($this->request->getPost("LISTDATA"), true);
		$getdata = $data["DATA"];
		foreach ($getdata as $v) {
			$insertDataMulti = array(
				"IDAKTIFASI" 	=> $v["IDAKTIFASI"],
				"IDPELANGGAN"	=> $v["IDPELANGGAN"],
				"IDONUREGISTER" => $v["IDONUREGISTER"],
				"PROFIL_KONEKSI"=> $v["PROFIL_KONEKSI"],
				"FLAG" 			=> $v["FLAG"]
			);
			$checkData = $this->model->checkId($v["IDPELANGGAN"]);
			if($checkData !== 'Data matches') {
				$status = $this->res_data(200, $checkData); $this->respond(200);
				$this->model->insert($insertDataMulti);
			}
			else { $status = $this->res_data(400, $checkData); $this->fail(400); }
		}
		echo json_encode(array("res" => $status));
	}
	public function do_delete(){
		$data = json_decode($this->request->getPost("LISTDATA"), true);
		$getdata = $data["DATA"];
		foreach ($getdata as $v) {
			$param = array(
				"IDAKTIFASI" => $v["IDAKTIFASI"]
			);
			$status = $this->res_data(200, "deleted"); $this->respond(200);
			$this->model->delete($param);
		}
		echo json_encode(array("res" => $status));
	}
}