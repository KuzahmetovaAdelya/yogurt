<?php
header("Content-Type: text/html; charset=UTF-8");

@ini_set('display_errors', 1);
@error_reporting(E_ALL);
function_exists('set_time_limit') && @set_time_limit(900);
@ini_set('memory_limit', '128M');
@ini_set('max_execution_time', '900');

/* Решение проблемы trict Standards: Implicit cloning object of class 'kernel' because of 'zend.ze1_compatibility_mode' */
if (version_compare(PHP_VERSION, '5.3', '<'))
{
	ini_set('zend.ze1_compatibility_mode', 0);
}

define('CMS_FOLDER', dirname(__FILE__) . DIRECTORY_SEPARATOR);

define('CHMOD_FILE', isset($_REQUEST['chmod_file']) ? octdec($_REQUEST['chmod_file']) : 0644);
define('CHMOD', isset($_REQUEST['chmod_dir']) ? octdec($_REQUEST['chmod_dir']) : 0755);

mb_internal_encoding('UTF-8');

$versions = array();
$versions[] = array(
	'name' => 'HostCMS.Старт v. 7.1.x',
	'url' => 'http://www.hostcms.ru/download/7/HostCMS.Free_7.1.tar.gz'
);
$versions[] = array(
	'name' => 'HostCMS.Старт v. 7.0.9',
	'url' => 'http://www.hostcms.ru/download/7/HostCMS.Free_7.0.tar.gz'
);
$versions[] = array(
	'name' => 'HostCMS.Старт v. 6.9.9',
	'url' => 'http://www.hostcms.ru/download/6/HostCMS.Free_6.9.tar.gz'
);

?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<title>Установка HostCMS</title>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
<link type="text/css" href="//www.hostcms.ru/download/6/install/6.5/css/bootstrap.min.css" rel="stylesheet"></link>
<link type="text/css" href="//www.hostcms.ru/download/6/install/6.5/css/hostcms.min.css" rel="stylesheet"></link>

<style type="text/css">
html {min-height: 100%; position: static !important; }
body {padding-right: 0 !important; /*Fix bug with bootbox modal window */}
body.hostcms-bootstrap1:before {
	background: url("//www.hostcms.ru/download/6/install/6.5/images/bg.jpg") repeat top center #EEE6CF;
}
.hostcms-bootstrap1 .page-breadcrumbs,
.hostcms-bootstrap1 .page-header,
.hostcms-bootstrap1 .row-title {
	opacity: .9;
}
.navbar .navbar-inner .navbar-header .navbar-account .account-area > li .dropdown-menu.dropdown-login-area > li.username {
    display: block;
    text-align: left;
}
.navbar .navbar-inner .navbar-header .navbar-account .account-area > li .dropdown-menu li.dropdown-header span {
    line-height: 34px;
    font-size: 17px;
    margin: 0;
    padding: 10px 2px;
    clear: both;
    color: #333;
    display: block;
    font-weight: 300;
}
.navbar .navbar-inner .navbar-header .navbar-account .setting-container label .text {
    color: #fff;
    font-weight: 300;
    margin-right: 8px;
}
.navbar .navbar-brand  img {
  margin-top: 9px;
  margin-left: 10px;
}
.hostcms-bootstrap1 .navbar .navbar-inner {
	background: none repeat scroll 0 0 rgba(0, 0, 0, 0.3)
}
.hostcms-bootstrap1 .navbar .navbar-inner .navbar-header .navbar-account .account-area > li > a .badge {
	box-shadow: 1px 1px 0 rgba(100, 100, 100, 0.1);
}
.hostcms-bootstrap1 .navbar .navbar-inner .navbar-header .navbar-account .account-area > li.open > a {
 background-color: rgba(100, 100, 100, 0.1);
}
.installContent {
	position: absolute;
	width: 60%;
	left: 50%;
	top: 10%;
	margin: 0 0 0 -30%;
	padding: 30px;
	background-color: rgba(255,255,255,0.15) !important;
}
</style>

<!--Fonts-->
<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&subset=latin,cyrillic" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

</head>
<body class="body-install hostcms-bootstrap1">

	<!-- Navbar -->
	<div class="navbar">
		<div class="navbar-inner">
			<div class="navbar-container">
				<!-- Navbar Barnd -->
				<div class="navbar-header pull-left">
					<a href="//www.hostcms.ru" class="navbar-brand" target="_blank">
						<img src="//www.hostcms.ru/download/6/install/6.5/images/logo-white.png" alt="(^) HostCMS" title="HostCMS" />
					</a>
				</div>
				<!-- /Navbar Barnd -->
			</div>
		</div>
	</div>
	<!-- /Navbar -->

	<div class="installContent">
		<?php
		// Установка
		if (isset($_POST['cms_version']))
		{
			$cms_version = intval($_POST['cms_version']);

			if (isset($versions[$cms_version]))
			{
				$f_path = $versions[$cms_version]['url'];

				// Имя файла
				$f_name = CMS_FOLDER . basename($f_path);

				// Файл на сервере
				if (!is_file($f_name))
				{
					Core_File::write($f_name,
						file_get_contents($f_path)
					);
				}

				if (is_file($f_name))
				{
					$Core_Tar = new Core_Tar($f_name);
					// Распаковываем файлы
					if ($Core_Tar->extractModify(CMS_FOLDER, CMS_FOLDER))
					{
						// Удаляем загруженный архив
						@unlink($f_name);

						// Удаляем файл install.php
						@unlink(CMS_FOLDER . 'install.php');

						?>
						<script type="text/javascript">
						location="/install/index.php";
						</script>
						<?php
					}
					else
					{
						echo("Ошибка распаковки дистрибутива!");
					}
				}
				else
				{
					echo("Файл {$f_name} не существует! Проверьте права на корневую директорию.");
				}
				//exit();
			}
			else
			{
				?><h1>Ошибка! Не найдена версия HostCMS.</h1><?php
			}
		}
		else
		{
		?>
		<h1>Загрузка и распаковка системы управления сайтом HostCMS</h1>

		<form name="authorization" action="./install.php" method="post">
			<p>Программа загрузит в корневую директорию сайта и распакует систему управления сайтом HostCMS.</p>
			<!-- <p>После загрузки системы управления Вы перейдете к установке HostCMS.</p> -->

			<p class="margin-top-20"><strong>Выберите редакцию системы управления сайтом:</strong></p>

			<?php
			foreach ($versions as $key => $value)
			{
				$checked = !$key ? 'checked=""' : '';
				?><p>
					<label><input type="radio" <?php echo $checked ?> name="cms_version" value="<?php echo $key ?>" class="margin-bottom-10"><span class="text"></span><?php echo $value['name']?></label>
				</p><?php
			}

			/*?><p>Права доступа к директориям: <input name="chmod_dir" type="text" size="3" value="<?php echo decoct(CHMOD)?>"></input></p>
			<p>Права доступа к файлам: <input name="chmod_file" type="text" size="3" value="<?php echo decoct(CHMOD_FILE)?>"></input></p><?php*/
			?><div class="margin-top-10">
				<button name="install" class="btn btn-info" type="submit">
					Загрузить <i class="fa fa-arrow-right"></i>
				</button>
			</div><?php
			?>
		</form>
		<?php
		}
		?>
	</div>
</body>
</html>
<?php

/**
 * Creates a tar archive
 *
 * @package HostCMS
 * @version 7.x
 * @author Vincent Blavet <vincent@phpconcept.net>
 */
class Core_Tar
{
	/**
	* @var string Name of the Tar
	*/
	protected $_tarname = '';

	/**
	* @var boolean if true, the Tar file will be gzipped
	*/
	protected $_compress = TRUE;

	/**
	* @var string Type of compression : 'none', 'gz' or 'bz2'
	*/
	protected $_compress_type = 'gz';

	/**
	* @var string Explode separator
	*/
	protected $_separator = ' ';

	/**
	* @var file descriptor
	*/
	protected $_file = 0;

	/**
	* @var string Local Tar name of a remote Tar (http:// or ftp://)
	*/
	protected $_temp_tarname = '';

	/**
	 * Exclude dir
	 * @var array
	 */
	protected $_excludeDir = array();

	/**
	 * Add Excluding Dir
	 */
	public function excludeDir($dirPath)
	{
		$this->_excludeDir[] = rtrim($dirPath, '\/');
		return $this;
	}

	/**
	* Archive_Tar Class constructor. This flavour of the constructor only
	* declare a new Archive_Tar object, identifying it by the name of the
	* tar file.
	* If the compress argument is set the tar will be read or created as a
	* gzip or bz2 compressed TAR file.
	*
	* @param	string $p_tarname The name of the tar archive to create
	* @param	string $p_compress can be null, 'gz' or 'bz2'. This
	* parameter indicates if gzip or bz2 compression
	* is required. For compatibility reason the
	* boolean value 'true' means 'gz'.
	* @access public
	*/
	public function __construct($p_tarname, $p_compress = NULL)
	{
		if (($p_compress === NULL) || ($p_compress == ''))
		{

			if (@file_exists($p_tarname))
			{
				if ($fp = @fopen($p_tarname, "rb"))
				{
					// look for gzip magic cookie
					$data = fread($fp, 2);
					fclose($fp);
					if ($data == "\37\213")
					{
						$this->_compress = true;
						$this->_compress_type = 'gz';
						// No sure it's enought for a magic code ....
					}
				}
			} else {
				// probably a remote file or some file accessible
				// through a stream interface
				if (substr($p_tarname, -2) == 'gz')
				{
					$this->_compress = true;
					$this->_compress_type = 'gz';
				}
			}
		}
		else
		{
			if (($p_compress === true) || ($p_compress == 'gz')) {
				$this->_compress = true;
				$this->_compress_type = 'gz';
			}
		}

		$this->_tarname = $p_tarname;
		if ($this->_compress)
		{
			// assert zlib or bz2 extension support
			if ($this->_compress_type == 'gz')
			{
				$extname = 'zlib';
			}
		}
	}

	/**
	* This method creates the archive file and add the files / directories
	* that are listed in $p_filelist.
	* If a file with the same name exist and is writable, it is replaced
	* by the new tar.
	* The method return false and a PEAR error text.
	* The $p_filelist parameter can be an array of string, each string
	* representing a filename or a directory name with their path if
	* needed. It can also be a single string with names separated by a
	* single blank.
	* For each directory added in the archive, the files and
	* sub-directories are also added.
	* See also createModify() method for more details.
	*
	* @param array $p_filelist An array of filenames and directory names, or a
	*						single string with names separated by a single
	*						blank space.
	* @return				true on success, false on error.
	* @see createModify()
	* @access public
	*/
	public function create($p_filelist)
	{
		return $this->createModify($p_filelist, '', '');
	}

	/**
	* This method add the files / directories that are listed in $p_filelist in
	* the archive. If the archive does not exist it is created.
	* The method return false and a PEAR error text.
	* The files and directories listed are only added at the end of the archive,
	* even if a file with the same name is already archived.
	* See also createModify() method for more details.
	*
	* @param array $p_filelist An array of filenames and directory names, or a
	*						single string with names separated by a single
	*						blank space.
	* @return				true on success, false on error.
	* @see createModify()
	* @access public
	*/
	public function add($p_filelist)
	{
		return $this->addModify($p_filelist, '', '');
	}

	/**
	 * Extract
	 * @param string $p_path path
	 */
	public function extract($p_path='')
	{
		return $this->extractModify($p_path, '');
	}

	/**
	* This method creates the archive file and add the files / directories
	* that are listed in $p_filelist.
	* If the file уже существует and is writable, it is replaced by the
	* new tar. It is a create and not an add. If the file exists and is
	* read-only or is a directory it is not replaced. The method return
	* false and a PEAR error text.
	* The $p_filelist parameter can be an array of string, each string
	* representing a filename or a directory name with their path if
	* needed. It can also be a single string with names separated by a
	* single blank.
	* The path indicated in $p_remove_dir will be removed FROM the
	* memorized path of each file / directory listed when this path
	* exists. By default nothing is removed (empty path '')
	* The path indicated in $p_add_dir will be added at the beginning of
	* the memorized path of each file / directory listed. However it can
	* be set to empty ''. The adding of a path is done after the removing
	* of path.
	* The path add/remove ability enables the user to prepare an archive
	* for extraction in a different path than the origin files are.
	* See also addModify() method for file adding properties.
	*
	* @param array $p_filelist	 An array of filenames and directory names,
	*							or a single string with names separated by
	*							a single blank space.
	* @param string $p_add_dir	 A string which contains a path to be added
	*							to the memorized path of each element in
	*							the list.
	* @param string $p_remove_dirA string which contains a path to be
	*							removed FROM the memorized path of each
	*							element in the list, when relevant.
	* @return boolean			true on success, false on error.
	* @access public
	* @see addModify()
	*/
	public function createModify($p_filelist, $p_add_dir, $p_remove_dir='')
	{
		$v_result = true;

		if (!$this->_openWrite())
		return false;

		if ($p_filelist != '')
		{
			if (is_array($p_filelist))
			{
				$v_list = $p_filelist;
			}
			elseif (is_string($p_filelist))
			{
				$v_list = explode($this->_separator, $p_filelist);
			}
			else
			{
				$this->_cleanFile();
				$this->_error('Tar: File List Error!');
				return false;
			}

			$v_result = $this->_addList($v_list, $p_add_dir, $p_remove_dir);
		}

		if ($v_result)
		{
			$this->_writeFooter();
			$this->_close();
		}
		else
		{
			$this->_cleanFile();
		}

		return $v_result;
	}

	/**
	* This method add the files / directories listed in $p_filelist at the
	* end of the existing archive. If the archive does not yet exists it
	* is created.
	* The $p_filelist parameter can be an array of string, each string
	* representing a filename or a directory name with their path if
	* needed. It can also be a single string with names separated by a
	* single blank.
	* The path indicated in $p_remove_dir will be removed FROM the
	* memorized path of each file / directory listed when this path
	* exists. By default nothing is removed (empty path '')
	* The path indicated in $p_add_dir will be added at the beginning of
	* the memorized path of each file / directory listed. However it can
	* be set to empty ''. The adding of a path is done after the removing
	* of path.
	* The path add/remove ability enables the user to prepare an archive
	* for extraction in a different path than the origin files are.
	* If a file/dir is already in the archive it will only be added at the
	* end of the archive. There is no update of the existing archived
	* file/dir. However while extracting the archive, the last file will
	* replace the first one. This results in a none optimization of the
	* archive size.
	* If a file/dir does not exist the file/dir is ignored. However an
	* error text is send to PEAR error.
	* If a file/dir is not readable the file/dir is ignored. However an
	* error text is send to PEAR error.
	*
	* @param array	 $p_filelist	 An array of filenames and directory
	*								 names, or a single string with names
	*								 separated by a single blank space.
	* @param string	 $p_add_dir	 A string which contains a path to be
	*								 added to the memorized path of each
	*								 element in the list.
	* @param string	 $p_remove_dir A string which contains a path to be
	*								 removed FROM the memorized path of
	*								 each element in the list, when
	*								 relevant.
	* @return						 true on success, false on error.
	* @access public
	*/
	public function addModify($p_filelist, $p_add_dir, $p_remove_dir='')
	{
		$v_result = true;

		if (!$this->_isArchive())
		$v_result = $this->createModify($p_filelist, $p_add_dir,
		$p_remove_dir);
		else {
			if (is_array($p_filelist))
			$v_list = $p_filelist;
			elseif (is_string($p_filelist))
			$v_list = explode($this->_separator, $p_filelist);
			else {
				$this->_error('Tar: File List Error!');
				return false;

			}

			$v_result = $this->_append($v_list, $p_add_dir, $p_remove_dir);
		}

		return $v_result;
	}

	/**
	* This method add a single string as a file at the
	* end of the existing archive. If the archive does not yet exists it
	* is created.
	*
	* @param string	 $p_filename	 A string which contains the full
	*								 filename path that will be associated
	*								 with the string.
	* @param string	 $p_string	 The content of the file added in
	*								 the archive.
	* @return						 true on success, false on error.
	* @access public
	*/
	public function addString($p_filename, $p_string)
	{
		$v_result = true;

		if (!$this->_isArchive()) {
			if (!$this->_openWrite()) {
				return false;
			}
			$this->_close();
		}

		if (!$this->_openAppend())
		return false;

		// Need to check the get back to the temporary file ? ....
		$v_result = $this->_addString($p_filename, $p_string);

		$this->_writeFooter();

		$this->_close();

		return $v_result;
	}

	/**
	* This method extract all the content of the archive in the directory
	* indicated by $p_path. When relevant the memorized path of the
	* files/dir can be modified by removing the $p_remove_path path at the
	* beginning of the file/dir path.
	* While extracting a file, if the directory path does not exists it is
	* created.
	* While extracting a file, if the file уже существует it is replaced
	* without looking for last modification date.
	* While extracting a file, if the file уже существует and is write
	* protected, the extraction is aborted.
	* While extracting a file, if a directory with the same name already
	* exists, the extraction is aborted.
	* While extracting a directory, if a file with the same name already
	* exists, the extraction is aborted.
	* While extracting a file/directory if the destination directory exist
	* and is write protected, or does not exist but can not be created,
	* the extraction is aborted.
	* If after extraction an extracted file does not show the correct
	* stored file size, the extraction is aborted.
	* When the extraction is aborted, a PEAR error text is set and false
	* is returned. However the result can be a partial extraction that may
	* need to be manually cleaned.
	*
	* @param string $p_path		 The path of the directory WHERE the
	*							 files/dir need to by extracted.
	* @param string $p_remove_path Part of the memorized path that can be
	*							 removed if present at the beginning of
	*							 the file/dir path.
	* @return boolean			 true on success, false on error.
	* @access public
	* @see extractList()
	*/
	public function extractModify($p_path, $p_remove_path)
	{
		$v_result = true;
		$v_list_detail = array();

		if ($v_result = $this->_openRead()) {
			$v_result = $this->_extractList($p_path, $v_list_detail,
			"complete", 0, $p_remove_path);
			$this->_close();
		}

		return $v_result;
	}

	/**
	* This method extract FROM the archive one file identified by $p_filename.
	* The return value is a string with the file content, or NULL on error.
	* @param string $p_filename	 The path of the file to extract in a string.
	* @return					 a string with the file content or NULL.
	* @access public
	*/
	public function extractInString($p_filename)
	{
		if ($this->_openRead()) {
			$v_result = $this->_extractInString($p_filename);
			$this->_close();
		} else {
			$v_result = NULL;
		}

		return $v_result;
	}

	/**
	* This method extract FROM the archive only the files indicated in the
	* $p_filelist. These files are extracted in the current directory or
	* in the directory indicated by the optional $p_path parameter.
	* If indicated the $p_remove_path can be used in the same way as it is
	* used in extractModify() method.
	* @param array $p_filelist	 An array of filenames and directory names,
	*							 or a single string with names separated
	*							 by a single blank space.
	* @param string $p_path		 The path of the directory WHERE the
	*							 files/dir need to by extracted.
	* @param string $p_remove_path Part of the memorized path that can be
	*							 removed if present at the beginning of
	*							 the file/dir path.
	* @return					 true on success, false on error.
	* @access public
	*/
	public function extractList($p_filelist, $p_path='', $p_remove_path='')
	{
		$v_result = true;
		$v_list_detail = array();

		if (is_array($p_filelist))
		$v_list = $p_filelist;
		elseif (is_string($p_filelist))
		$v_list = explode($this->_separator, $p_filelist);
		else {
			$this->_error('Tar: Row List Error!');
			return false;
		}

		if ($v_result = $this->_openRead()) {
			$v_result = $this->_extractList($p_path, $v_list_detail, "partial",
			$v_list, $p_remove_path);
			$this->_close();
		}

		return $v_result;
	}

	/**
	 * Show error message
	 * @param string $p_message message text
	 */
	protected function _error($p_message)
	{
		Core_Message::show($p_message, 'error');
	}

	/**
	 * Show warning message
	 * @param string $p_message message text
	 */
	protected function _warning($p_message)
	{
		Core_Message::show($p_message, 'error');
	}

	/**
	 * Check if file is archive
	 * @param string $p_filename file name
	 * @return boolean
	 */
	protected function _isArchive($p_filename=NULL)
	{
		if ($p_filename == NULL) {
			$p_filename = $this->_tarname;
		}
		clearstatcache();
		return @is_file($p_filename);
	}

	/**
	 * Open for write
	 * @return boolean
	 */
	protected function _openWrite()
	{
		if ($this->_compress_type == 'gz')
		{
			$this->_file = $this->gzopen($this->_tarname, "wb9");
		}
		else if ($this->_compress_type == 'bz2')
		{
			$this->_file = bzopen($this->_tarname, "wb");
		}
		else if ($this->_compress_type == 'none')
		{
			$this->_file = fopen($this->_tarname, "wb");
		}
		else
		{
			$this->_error('Unknown compression type (' . $this->_compress_type . ')');
		}

		if ($this->_file == 0)
		{
		$this->_error("File open error '{$this->_tarname}'");
			return false;
		}

		return true;
	}

	/**
	 * Open for read
	 * @return boolean
	 */
	protected function _openRead()
	{
		if (strtolower(substr($this->_tarname, 0, 7)) == 'http://') {

			// ----- Look if a local copy need to be done
			if ($this->_temp_tarname == '') {
				$this->_temp_tarname = uniqid('tar').'.tmp';
				if (!$v_file_from = @fopen($this->_tarname, 'rb')) {
					$this->_error('Read file error \''
					.$this->_tarname.'\'');
					$this->_temp_tarname = '';
					return false;
				}
				if (!$v_file_to = @fopen($this->_temp_tarname, 'wb')) {
					$this->_error('Write file error \'' .$this->_temp_tarname.'\'');
					$this->_temp_tarname = '';
					return false;
				}
				while ($v_data = @fread($v_file_from, 1024))
				@fwrite($v_file_to, $v_data);
				@fclose($v_file_from);
				@fclose($v_file_to);
			}

			// ----- File to open if the local copy
			$v_filename = $this->_temp_tarname;

		} else
		// ----- File to open if the normal Tar file
		$v_filename = $this->_tarname;

		if ($this->_compress_type == 'gz')
		$this->_file = $this->gzopen($v_filename, "rb");
		else if ($this->_compress_type == 'bz2')
		$this->_file = bzopen($v_filename, "rb");
		else if ($this->_compress_type == 'none')
		$this->_file = fopen($v_filename, "rb");
		else
		$this->_error('Unknown compression type ('
		.$this->_compress_type.')');

		if ($this->_file == 0) {
			$this->_error('Can not open to read \''.$v_filename.'\'');
			return false;
		}

		return true;
	}

	/**
	 * Open for read and write
	 * @return boolean
	 */
	protected function _openReadWrite()
	{
		if ($this->_compress_type == 'gz')
		$this->_file = $this->gzopen($this->_tarname, "r+b");
		else if ($this->_compress_type == 'bz2')
		$this->_file = bzopen($this->_tarname, "r+b");
		else if ($this->_compress_type == 'none')
		$this->_file = fopen($this->_tarname, "r+b");
		else
		$this->_error('Unknown compression type ('
		.$this->_compress_type.')');

		if ($this->_file == 0) {
			$this->_error('Tar: Open file error \'' . $this->_tarname . '\'');
			return false;
		}

		return true;
	}

	/**
	 * Close
	 * @return boolean
	 */
	protected function _close()
	{
		//if (isset($this->_file)) {
		if (is_resource($this->_file)) {
			if ($this->_compress_type == 'gz')
			@gzclose($this->_file);
			else if ($this->_compress_type == 'bz2')
			@bzclose($this->_file);
			else if ($this->_compress_type == 'none')
			@fclose($this->_file);
			else
			$this->_error('Unknown compression type ('.$this->_compress_type.')');

			$this->_file = 0;
		}

		// ----- Look if a local copy need to be erase
		// Note that it might be interesting to keep the url for a time : ToDo
		if ($this->_temp_tarname != '') {
			@unlink($this->_temp_tarname);
			$this->_temp_tarname = '';
		}

		return true;
	}

	/**
	 * Clean file
	 * @return boolean
	 */
	protected function _cleanFile()
	{
		$this->_close();

		// ----- Look for a local copy
		if ($this->_temp_tarname != '') {
			// ----- Remove the local copy but not the remote tarname
			@unlink($this->_temp_tarname);
			$this->_temp_tarname = '';
		} else {
			// ----- Remove the local tarname file
			@unlink($this->_tarname);
		}
		$this->_tarname = '';

		return true;
	}

	/**
	 * Write block
	 * @param string $p_binary_data
	 * @param int $p_len data length
	 * @return boolean
	 */
	protected function _writeBlock($p_binary_data, $p_len=null)
	{
		if (is_resource($this->_file)) {
			if ($p_len === NULL) {
				if ($this->_compress_type == 'gz')
				@gzputs($this->_file, $p_binary_data);
				else if ($this->_compress_type == 'bz2')
				@bzwrite($this->_file, $p_binary_data);
				else if ($this->_compress_type == 'none')
				@fputs($this->_file, $p_binary_data);
				else
				$this->_error('Unknown compression type (' . $this->_compress_type . ')');
			} else {
				if ($this->_compress_type == 'gz')
				@gzputs($this->_file, $p_binary_data, $p_len);
				else if ($this->_compress_type == 'bz2')
				@bzwrite($this->_file, $p_binary_data, $p_len);
				else if ($this->_compress_type == 'none')
				@fputs($this->_file, $p_binary_data, $p_len);
				else
				$this->_error('Unknown compression type (' .$this->_compress_type.')');

			}
		}
		return true;
	}

	/**
	 * Read block
	 * @return string
	 */
	protected function _readBlock()
	{
		$v_block = NULL;
		if (is_resource($this->_file)) {
			if ($this->_compress_type == 'gz')
			$v_block = @gzread($this->_file, 512);
			else if ($this->_compress_type == 'bz2')
			$v_block = @bzread($this->_file, 512);
			else if ($this->_compress_type == 'none')
			$v_block = @fread($this->_file, 512);
			else
			$this->_error('Unknown compression type (' . $this->_compress_type.')');
		}
		return $v_block;
	}

	/**
	 * Skip block
	 * @param int $p_len block length
	 * @return boolean
	 */
	protected function _jumpBlock($p_len=null)
	{
		if (is_resource($this->_file)) {
			if ($p_len === NULL)
			$p_len = 1;

			if ($this->_compress_type == 'gz') {
				@gzseek($this->_file, @gztell($this->_file)+($p_len*512));
			}
			else if ($this->_compress_type == 'bz2') {
				// ----- Replace missing bztell() and bzseek()
				for ($i=0; $i<$p_len; $i++)
				$this->_readBlock();
			} else if ($this->_compress_type == 'none')
			@fseek($this->_file, @ftell($this->_file)+($p_len*512));
			else
			$this->_error('Unknown compression type (' .$this->_compress_type.')');
		}
		return true;
	}

	/**
	 * Write footer
	 * @return boolean
	 */
	protected function _writeFooter()
	{
		if (is_resource($this->_file)) {
			// ----- Write the last 0 filled block for end of archive
			$v_binary_data = pack("a512", '');
			$this->_writeBlock($v_binary_data);
		}
		return true;
	}

	/**
	 * Add list
	 * @param array $p_list
	 * @param string $p_add_dir
	 * @param string $p_remove_dir
	 * @return boolean
	 */
	protected function _addList($p_list, $p_add_dir, $p_remove_dir)
	{
		$v_result = true;
		$v_header = array();

		// ----- Remove potential windows directory separator
		$p_add_dir = $this->_translateWinPath($p_add_dir);
		$p_remove_dir = $this->_translateWinPath($p_remove_dir, false);

		if (!$this->_file) {
			$this->_error('Неправильный дескриптор файла');
			return false;
		}

		if (sizeof($p_list) == 0)
		return true;

		// Не включаемые в архив расширения файлов
		// Разбираем строку невключаемых расширений в массив
		$extension_list = defined('EXTENSION_NOT_IN_BACKUP')
			? explode(' ', EXTENSION_NOT_IN_BACKUP)
			: array();

		foreach ($p_list as $v_filename)
		{
			if (!$v_result)
			{
				break;
			}

			// Заменяем удвоеные слэши на одинарные
			$v_filename = str_replace(array('//', '\\\\'), array('/', '\\'), $v_filename);
			$v_filename = str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, $v_filename);

			// Не архивируем папку, в которой располагаем архив
			if (strpos($v_filename, rtrim(BACKUP_DIR, DIRECTORY_SEPARATOR)) === 0)
			{
				continue;
			}

			// Skip set dirs
			foreach ($this->_excludeDir as $excludeDir)
			{
				if (strpos($v_filename, $excludeDir) === 0)
				{
					continue;
				}
			}

			$extension = Core_File::getExtension($v_filename);

			// Если расширение файла имеется в списке неархивируемых - пропускаем файл
			if (in_array($extension, $extension_list))
			{
				continue;
			}

			/*if (strpos($v_filename, 'backup') !== FALSE)
			{
				Core_Log::instance()->clear()
					->status(Core_Log::$SUCCESS)
					->write($v_filename . '===' . BACKUP_DIR . '<br>');
			}*/

			// ----- Skip the current tar name
			if ($v_filename == $this->_tarname)
			{
				continue;
			}

			//if ($v_filename == '')
			if (empty($v_filename))
			{
				continue;
			}

			if (!file_exists($v_filename)) {
				$this->_warning("Предупреждение: Файл '$v_filename' не существует!");
				continue;
			}

			// ----- Add the file or directory header
			if (!$this->_addFile($v_filename, $v_header, $p_add_dir, $p_remove_dir))
			return false;

			if (@is_dir($v_filename) && !is_link($v_filename))
			{
				if (!($p_hdir = opendir($v_filename))) {
					$this->_warning("Предупреждение: Не могу прочитать директорию '$v_filename'!");
					continue;
				}
				while (false !== ($p_hitem = readdir($p_hdir))) {
					if (($p_hitem != '.') && ($p_hitem != '..')) {
						if ($v_filename != ".")
						$p_temp_list[0] = $v_filename.'/'.$p_hitem;
						else
						$p_temp_list[0] = $p_hitem;

						$v_result = $this->_addList($p_temp_list,$p_add_dir,$p_remove_dir);

					}
				}

				unset($p_temp_list);
				unset($p_hdir);
				unset($p_hitem);
			}
		}

		return $v_result;
	}

	/**
	 * Add file
	 * @param string $p_filename
	 * @param pointer $p_header
	 * @param string $p_add_dir
	 * @param string $p_remove_dir
	 * @return boolean
	 */
	protected function _addFile($p_filename, &$p_header, $p_add_dir, $p_remove_dir)
	{
		if (!$this->_file) {
			$this->_error('Неправильный дескриптор файла');
			return false;
		}

		if ($p_filename == '') {
			$this->_error('Неправильное имя файла');
			return false;
		}

		// ----- Calculate the stored filename
		$p_filename = $this->_translateWinPath($p_filename, false);
		$v_stored_filename = $p_filename;
		if (strcmp($p_filename, $p_remove_dir) == 0) {
			return true;
		}
		if ($p_remove_dir != '') {
			if (substr($p_remove_dir, -1) != '/')
			$p_remove_dir .= '/';

			if (substr($p_filename, 0, strlen($p_remove_dir)) == $p_remove_dir)
			$v_stored_filename = substr($p_filename, strlen($p_remove_dir));
		}
		$v_stored_filename = $this->_translateWinPath($v_stored_filename);
		if ($p_add_dir != '') {
			if (substr($p_add_dir, -1) == '/')
			$v_stored_filename = $p_add_dir.$v_stored_filename;
			else
			$v_stored_filename = $p_add_dir.'/'.$v_stored_filename;
		}

		$v_stored_filename = $this->_pathReduction($v_stored_filename);

		if ($this->_isArchive($p_filename)) {
			if (($v_file = @fopen($p_filename, "rb")) == 0) {
				$this->_warning("Предупреждение: Не могу открыть файл '".$p_filename
				."' для чтения в бинарном режиме!");
				return true;
			}

			if (!$this->_writeHeader($p_filename, $v_stored_filename))
			{
				return false;
			}

			while (($v_buffer = fread($v_file, 512)) != '')
			{
				$v_binary_data = pack("a512", "$v_buffer");
				$this->_writeBlock($v_binary_data);
			}

			fclose($v_file);
		}
		else
		{
			// ----- Only header for dir
			if (!$this->_writeHeader($p_filename, $v_stored_filename))
			return false;
		}

		return true;
	}

	/**
	 * Add string
	 * @param $p_filename
	 * @param $p_string
	 * @return boolean
	 */
	protected function _addString($p_filename, $p_string)
	{
		if (!$this->_file) {
			$this->_error('Неправильный дескриптор файла');
			return false;
		}

		if ($p_filename == '') {
			$this->_error('Неправильно имя файла');
			return false;
		}

		// ----- Calculate the stored filename
		$p_filename = $this->_translateWinPath($p_filename, false);

		if (!$this->_writeHeaderBlock($p_filename, strlen($p_string),0, 0, "", 0, 0))
		return false;

		$i=0;

		while (($v_buffer = substr($p_string, (($i++)*512), 512)) != '')
		{
			$v_binary_data = pack("a512", $v_buffer);
			$this->_writeBlock($v_binary_data);
		}

		return true;
	}

	/**
	 * Write header
	 * @param string $p_filename
	 * @param string $p_stored_filename
	 * @return boolean
	 */
	protected function _writeHeader($p_filename, $p_stored_filename)
	{
		if ($p_stored_filename == '')
		$p_stored_filename = $p_filename;
		$v_reduce_filename = $this->_pathReduction($p_stored_filename);

		if (strlen($v_reduce_filename) > 99) {
			if (!$this->_writeLongHeader($v_reduce_filename))
			return false;
		}

		$v_info = stat($p_filename);
		$v_uid = sprintf("%6s ", decoct($v_info[4]));
		$v_gid = sprintf("%6s ", decoct($v_info[5]));
		$v_perms = sprintf("%6s ", decoct(fileperms($p_filename)));

		$v_mtime = sprintf("%11s", decoct(filemtime($p_filename)));

		if (@is_dir($p_filename) && !is_link($p_filename))
		{
			$v_typeflag = "5";
			$v_size = sprintf("%11s ", decoct(0));
		} else {
			$v_typeflag = '';
			clearstatcache();
			$v_size = sprintf("%11s ", decoct(filesize($p_filename)));
		}

		$v_linkname = '';

		$v_magic = '';

		$v_version = '';

		$v_uname = '';

		$v_gname = '';

		$v_devmajor = '';

		$v_devminor = '';

		$v_prefix = '';

		$v_binary_data_first = pack("a100a8a8a8a12A12",
		$v_reduce_filename, $v_perms, $v_uid,
		$v_gid, $v_size, $v_mtime);
		$v_binary_data_last = pack("a1a100a6a2a32a32a8a8a155a12",
		$v_typeflag, $v_linkname, $v_magic,
		$v_version, $v_uname, $v_gname,
		$v_devmajor, $v_devminor, $v_prefix, '');

		// ----- Calculate the checksum
		$v_checksum = 0;
		// ..... First part of the header
		for ($i=0; $i<148; $i++)
		$v_checksum += ord(substr($v_binary_data_first,$i,1));
		// ..... Ignore the checksum value and replace it by ' ' (space)
		for ($i=148; $i<156; $i++)
		$v_checksum += ord(' ');
		// ..... Last part of the header
		for ($i=156, $j=0; $i<512; $i++, $j++)
		$v_checksum += ord(substr($v_binary_data_last,$j,1));

		// ----- Write the first 148 bytes of the header in the archive
		$this->_writeBlock($v_binary_data_first, 148);

		// ----- Write the calculated checksum
		$v_checksum = sprintf("%6s ", decoct($v_checksum));
		$v_binary_data = pack("a8", $v_checksum);
		$this->_writeBlock($v_binary_data, 8);

		// ----- Write the last 356 bytes of the header in the archive
		$this->_writeBlock($v_binary_data_last, 356);

		return true;
	}

	/**
	 * Write header block
	 * @param string $p_filename file name
	 * @param int $p_size size
	 * @param int $p_mtime
	 * @param int $p_perms
	 * @param string $p_type
	 * @param int $p_uid
	 * @param int $p_gid
	 * @return boolean
	 */
	protected function _writeHeaderBlock($p_filename, $p_size, $p_mtime=0, $p_perms=0,
	$p_type='', $p_uid=0, $p_gid=0)
	{
		$p_filename = $this->_pathReduction($p_filename);

		if (strlen($p_filename) > 99) {
			if (!$this->_writeLongHeader($p_filename))
			return false;
		}

		if ($p_type == "5") {
			$v_size = sprintf("%11s ", decoct(0));
		} else {
			$v_size = sprintf("%11s ", decoct($p_size));
		}

		$v_uid = sprintf("%6s ", decoct($p_uid));
		$v_gid = sprintf("%6s ", decoct($p_gid));
		$v_perms = sprintf("%6s ", decoct($p_perms));

		$v_mtime = sprintf("%11s", decoct($p_mtime));

		$v_linkname = '';

		$v_magic = '';

		$v_version = '';

		$v_uname = '';

		$v_gname = '';

		$v_devmajor = '';

		$v_devminor = '';

		$v_prefix = '';

		$v_binary_data_first = pack("a100a8a8a8a12A12",
		$p_filename, $v_perms, $v_uid, $v_gid,
		$v_size, $v_mtime);
		$v_binary_data_last = pack("a1a100a6a2a32a32a8a8a155a12",
		$p_type, $v_linkname, $v_magic,
		$v_version, $v_uname, $v_gname,
		$v_devmajor, $v_devminor, $v_prefix, '');

		// ----- Calculate the checksum
		$v_checksum = 0;
		// ..... First part of the header
		for ($i=0; $i<148; $i++)
		$v_checksum += ord(substr($v_binary_data_first,$i,1));
		// ..... Ignore the checksum value and replace it by ' ' (space)
		for ($i=148; $i<156; $i++)
		$v_checksum += ord(' ');
		// ..... Last part of the header
		for ($i=156, $j=0; $i<512; $i++, $j++)
		$v_checksum += ord(substr($v_binary_data_last,$j,1));

		// ----- Write the first 148 bytes of the header in the archive
		$this->_writeBlock($v_binary_data_first, 148);

		// ----- Write the calculated checksum
		$v_checksum = sprintf("%6s ", decoct($v_checksum));
		$v_binary_data = pack("a8", $v_checksum);
		$this->_writeBlock($v_binary_data, 8);

		// ----- Write the last 356 bytes of the header in the archive
		$this->_writeBlock($v_binary_data_last, 356);

		return true;
	}

	/**
	 * Write long header
	 * @param string $p_filename
	 * @return boolean
	 */
	protected function _writeLongHeader($p_filename)
	{
		$v_size = sprintf("%11s ", decoct(strlen($p_filename)));

		$v_typeflag = 'L';

		$v_linkname = '';

		$v_magic = '';

		$v_version = '';

		$v_uname = '';

		$v_gname = '';

		$v_devmajor = '';

		$v_devminor = '';

		$v_prefix = '';

		$v_binary_data_first = pack("a100a8a8a8a12A12",
		'././@LongLink', 0, 0, 0, $v_size, 0);
		$v_binary_data_last = pack("a1a100a6a2a32a32a8a8a155a12",
		$v_typeflag, $v_linkname, $v_magic,
		$v_version, $v_uname, $v_gname,
		$v_devmajor, $v_devminor, $v_prefix, '');

		// ----- Calculate the checksum
		$v_checksum = 0;
		// ..... First part of the header
		for ($i=0; $i<148; $i++)
		$v_checksum += ord(substr($v_binary_data_first,$i,1));
		// ..... Ignore the checksum value and replace it by ' ' (space)
		for ($i=148; $i<156; $i++)
		$v_checksum += ord(' ');
		// ..... Last part of the header
		for ($i=156, $j=0; $i<512; $i++, $j++)
		$v_checksum += ord(substr($v_binary_data_last,$j,1));

		// ----- Write the first 148 bytes of the header in the archive
		$this->_writeBlock($v_binary_data_first, 148);

		// ----- Write the calculated checksum
		$v_checksum = sprintf("%6s ", decoct($v_checksum));
		$v_binary_data = pack("a8", $v_checksum);
		$this->_writeBlock($v_binary_data, 8);

		// ----- Write the last 356 bytes of the header in the archive
		$this->_writeBlock($v_binary_data_last, 356);

		// ----- Write the filename as content of the block
		$i=0;
		while (($v_buffer = substr($p_filename, (($i++)*512), 512)) != '') {
			$v_binary_data = pack("a512", "$v_buffer");
			$this->_writeBlock($v_binary_data);
		}

		return true;
	}

	/**
	 * Read header
	 * @param string $v_binary_data
	 * @param pointer $v_header
	 * @return boolean
	 */
	protected function _readHeader($v_binary_data, &$v_header)
	{
		if (strlen($v_binary_data) == 0)
		{
			$v_header['filename'] = '';
			return true;
		}

		if (strlen($v_binary_data) != 512)
		{
			$v_header['filename'] = '';
			$this->_error('Wrong block size: '.strlen($v_binary_data));

			Core_Log::instance()->clear()
				->status(Core_Log::$ERROR)
				->write('Core_Tar. Wrong block size: '.strlen($v_binary_data));

			return false;
		}

		// ----- Calculate the checksum
		$v_checksum = 0;
		// ..... First part of the header
		for ($i=0; $i<148; $i++)
		$v_checksum+=ord(substr($v_binary_data,$i,1));
		// ..... Ignore the checksum value and replace it by ' ' (space)
		for ($i=148; $i<156; $i++)
		$v_checksum += ord(' ');
		// ..... Last part of the header
		for ($i=156; $i<512; $i++)
		$v_checksum+=ord(substr($v_binary_data,$i,1));

		$v_data = unpack("a100filename/a8mode/a8uid/a8gid/a12size/a12mtime/"
		."a8checksum/a1typeflag/a100link/a6magic/a2version/"
		."a32uname/a32gname/a8devmajor/a8devminor",
		$v_binary_data);

		// ----- Extract the checksum
		$v_header['checksum'] = octdec(trim($v_data['checksum']));
		if ($v_header['checksum'] != $v_checksum) {
			$v_header['filename'] = '';

			// ----- Look for last block (empty block)
			if ($v_checksum == 256 && $v_header['checksum'] == 0)
			{
			return true;
			}

			$this->_error('Ошибка расчета контрольной суммы "'.$v_data['filename']
			.'" : '.$v_checksum.' рассчитана, '
			.$v_header['checksum'].' фактически указана');
			return false;
		}

		// ----- Extract the properties
		$v_header['filename'] = trim($v_data['filename']);
		$v_header['mode'] = octdec(trim($v_data['mode']));
		$v_header['uid'] = octdec(trim($v_data['uid']));
		$v_header['gid'] = octdec(trim($v_data['gid']));
		$v_header['size'] = octdec(trim($v_data['size']));
		$v_header['mtime'] = octdec(trim($v_data['mtime']));
		if (($v_header['typeflag'] = $v_data['typeflag']) == "5") {
			$v_header['size'] = 0;
		}
		/* ----- All these fields are removed form the header because
		they do not carry interesting info
		$v_header[link] = trim($v_data[link]);
		$v_header[magic] = trim($v_data[magic]);
		$v_header[version] = trim($v_data[version]);
		$v_header[uname] = trim($v_data[uname]);
		$v_header[gname] = trim($v_data[gname]);
		$v_header[devmajor] = trim($v_data[devmajor]);
		$v_header[devminor] = trim($v_data[devminor]);
		*/
		return true;
	}

	/**
	 * Read long header
	 * @param pointer $v_header
	 * @return boolean
	 */
	protected function _readLongHeader(&$v_header)
	{
		$v_filename = '';
		$n = floor($v_header['size']/512);
		for ($i=0; $i<$n; $i++) {
			$v_content = $this->_readBlock();
			$v_filename .= $v_content;
		}
		if (($v_header['size'] % 512) != 0) {
			$v_content = $this->_readBlock();
			$v_filename .= $v_content;
		}

		// ----- Read the next header
		$v_binary_data = $this->_readBlock();

		if (!$this->_readHeader($v_binary_data, $v_header))
		return false;

		$v_header['filename'] = trim($v_filename);

		return true;
	}

	/**
	* This method extract FROM the archive one file identified by $p_filename.
	* The return value is a string with the file content, or NULL on error.
	* @param string $p_filename	 The path of the file to extract in a string.
	* @return					 a string with the file content or NULL.
	* @access private
	*/
	protected function _extractInString($p_filename)
	{
		$v_result_str = "";

		While (strlen($v_binary_data = $this->_readBlock()) != 0)
		{
			if (!$this->_readHeader($v_binary_data, $v_header))
			return NULL;

			if ($v_header['filename'] == '')
			continue;

			// ----- Look for long filename
			if ($v_header['typeflag'] == 'L') {
				if (!$this->_readLongHeader($v_header))
				return NULL;
			}

			if ($v_header['filename'] == $p_filename) {
				if ($v_header['typeflag'] == "5") {
					$this->_error('Не удается извлечь строку в каталоге {'.$v_header['filename'].'}');
					return NULL;
				} else {
					$n = floor($v_header['size']/512);
					for ($i=0; $i<$n; $i++) {
						$v_result_str .= $this->_readBlock();
					}
					if (($v_header['size'] % 512) != 0) {
						$v_content = $this->_readBlock();
						$v_result_str .= substr($v_content, 0,
						($v_header['size'] % 512));
					}
					return $v_result_str;
				}
			} else {
				$this->_jumpBlock(ceil(($v_header['size']/512)));
			}
		}

		return NULL;
	}

	/**
	 * Extract list
	 * @param string $p_path path
	 * @param pointer $p_list_detail
	 * @param string $p_mode
	 * @param array $p_file_list
	 * @param string $p_remove_path
	 */
	protected function _extractList($p_path, &$p_list_detail, $p_mode,
	$p_file_list, $p_remove_path)
	{
		$v_result=true;
		$v_nb = 0;
		$v_extract_all = true;
		$v_listing = false;

		$p_path = $this->_translateWinPath($p_path, false);
		if ($p_path == '' || (substr($p_path, 0, 1) != '/'
		&& substr($p_path, 0, 3) != "../" && !strpos($p_path, ':'))) {
			$p_path = "./".$p_path;
		}
		$p_remove_path = $this->_translateWinPath($p_remove_path);

		// ----- Look for path to remove format (should end by /)
		if (($p_remove_path != '') && (substr($p_remove_path, -1) != '/'))
		$p_remove_path .= '/';
		$p_remove_path_size = strlen($p_remove_path);

		switch ($p_mode) {
			case "complete" :
				$v_extract_all = TRUE;
				$v_listing = FALSE;
				break;
			case "partial" :
				$v_extract_all = FALSE;
				$v_listing = FALSE;
				break;
			case "list" :
				$v_extract_all = FALSE;
				$v_listing = TRUE;
				break;
			default :
				$this->_error('Неправильный режим извелечения ('.$p_mode.')');
				return false;
		}

		clearstatcache();

		while (strlen($v_binary_data = $this->_readBlock()) != 0)
		{
			$v_extract_file = FALSE;
			$v_extraction_stopped = 0;

			if (!$this->_readHeader($v_binary_data, $v_header))
			return false;

			if ($v_header['filename'] == '') {
				continue;
			}

			// ----- Look for long filename
			if ($v_header['typeflag'] == 'L') {
				if (!$this->_readLongHeader($v_header))
				return false;
			}

			if ((!$v_extract_all) && (is_array($p_file_list))) {
				// ----- By default no unzip if the file is not found
				$v_extract_file = false;

				for ($i=0; $i<sizeof($p_file_list); $i++) {
					// ----- Look if it is a directory
					if (substr($p_file_list[$i], -1) == '/') {
						// ----- Look if the directory is in the filename path
						if ((strlen($v_header['filename']) > strlen($p_file_list[$i]))
							&& (substr($v_header['filename'], 0, strlen($p_file_list[$i])) == $p_file_list[$i]))
						{
							$v_extract_file = TRUE;
							break;
						}
					}

					// ----- It is a file, so compare the file names
					elseif ($p_file_list[$i] == $v_header['filename']) {
						$v_extract_file = TRUE;
						break;
					}
				}
			} else {
				$v_extract_file = TRUE;
			}

			// ----- Look if this file need to be extracted
			if (($v_extract_file) && (!$v_listing))
			{
				if (($p_remove_path != '') && (substr($v_header['filename'], 0, $p_remove_path_size) == $p_remove_path))
				{
					$v_header['filename'] = substr($v_header['filename'], $p_remove_path_size);
				}
			
				if (($p_path != './') && ($p_path != '/')) {
					while (substr($p_path, -1) == '/')
					$p_path = substr($p_path, 0, strlen($p_path)-1);

					$v_header['filename'] = substr($v_header['filename'], 0, 1) == '/'
						? $p_path . $v_header['filename']
						: $p_path . '/' . $v_header['filename'];
				}

				$v_header['filename'] = trim($v_header['filename']);

				if (file_exists($v_header['filename'])) {
					if ((@is_dir($v_header['filename']) && !is_link($v_header['filename']))
					&& ($v_header['typeflag'] == '')) {
						$this->_error("Файл {$v_header['filename']} уже существует и является директорией");
						return false;
					}
					if (($this->_isArchive($v_header['filename']))
					&& ($v_header['typeflag'] == "5")) {
						$this->_error('Директория '.$v_header['filename'].' уже существует и является файлом');
						return false;
					}
					if (!is_writeable($v_header['filename'])) {
						$this->_error('Файл '.$v_header['filename'].' уже существует и защищен от записи! Установите права доступа к файлу в соответствии с руководством по установке.');
						return false;
					}
					if (filemtime($v_header['filename']) > $v_header['mtime']) {
						// To be completed : An error or silent no replace ?
					}
				}
				// ----- Check the directory availability and create it if necessary
				elseif (($v_result = $this->_dirCheck(($v_header['typeflag'] == "5"
				? $v_header['filename']
				: dirname($v_header['filename'])), Core_Array::get($v_header, 'mode', CHMOD))) != 1)
				{
					$this->_error('Ошибка создания пути для ' . $v_header['filename']);
					return false;
				}

				if ($v_extract_file) {
					if ($v_header['typeflag'] == "5") {
						if (!@file_exists($v_header['filename'])) {

							$chmod = Core_Array::get($v_header, 'mode', CHMOD);

							$chmod > CHMOD && $chmod = CHMOD;

							if (!@mkdir($v_header['filename'], $chmod))
							{
								$this->_error('Ошибка создания директории "'.$v_header['filename'].'"');
								return false;
							}

							@chmod($v_header['filename'], $chmod);
						}
					} else {
						if (($v_dest_file = @fopen($v_header['filename'], "wb")) == 0)
						{
							$this->_error('Ошибка открытия на запись "'.$v_header['filename'].'" в бинарном режиме');
							return false;
						}
						else
						{
							$n = floor($v_header['size']/512);
							for ($i=0; $i<$n; $i++) {
								$v_content = $this->_readBlock();
								fwrite($v_dest_file, $v_content, 512);
							}
							if (($v_header['size'] % 512) != 0) {
								$v_content = $this->_readBlock();
								fwrite($v_dest_file, $v_content, ($v_header['size'] % 512));
							}

							@fclose($v_dest_file);

							// ----- Change the file mode, mtime
							@touch($v_header['filename'], $v_header['mtime']);

							$chmod = Core_Array::get($v_header, 'mode', CHMOD_FILE);

							$chmod > CHMOD_FILE && $chmod = CHMOD_FILE;

							@chmod($v_header['filename'], $chmod);
						}

						// ----- Check the file size
						clearstatcache();
						if (filesize($v_header['filename']) != $v_header['size']) {
							$this->_error('Извлеченный файл '.$v_header['filename'].' имеет некорректный размер \''
							.filesize($v_header['filename']).'\' (должен быть '.$v_header['size'].'). Архив может быть поврежден.');
							return false;
						}
					}
				} else {
					$this->_jumpBlock(ceil(($v_header['size']/512)));
				}
			} else {
				$this->_jumpBlock(ceil(($v_header['size']/512)));
			}

			/* TBC : Seems to be unused ...
			if ($this->_compress)
			$v_end_of_file = @gzeof($this->_file);
			else
			$v_end_of_file = @feof($this->_file);
			*/

			if ($v_listing || $v_extract_file || $v_extraction_stopped) {
				// ----- Log extracted files
				if (($v_file_dir = dirname($v_header['filename']))
				== $v_header['filename'])
				$v_file_dir = '';
				if ((substr($v_header['filename'], 0, 1) == '/') && ($v_file_dir == ''))
				$v_file_dir = '/';

				$p_list_detail[$v_nb++] = $v_header;
			}
		}

		return true;
	}

	/**
	 * Open for append
	 */
	protected function _openAppend()
	{
		if (filesize($this->_tarname) == 0)
		return $this->_openWrite();

		if ($this->_compress) {
			$this->_close();

			if (!@rename($this->_tarname, $this->_tarname.".tmp")) {
				$this->_error('Ошибка при переименовании \''.$this->_tarname
				.'\' во временный файл \''.$this->_tarname.'.tmp\'');
				return false;
			}

			if ($this->_compress_type == 'gz')
			$v_temp_tar = $this->gzopen($this->_tarname.".tmp", "rb");
			elseif ($this->_compress_type == 'bz2')
			$v_temp_tar = bzopen($this->_tarname.".tmp", "rb");

			if ($v_temp_tar == 0) {
				$this->_error('Ошибка открытия файла \''.$this->_tarname
				.'.tmp\' в бинарном режиме');
				@rename($this->_tarname.".tmp", $this->_tarname);
				return false;
			}

			if (!$this->_openWrite()) {
				@rename($this->_tarname.".tmp", $this->_tarname);
				return false;
			}

			if ($this->_compress_type == 'gz') {
				$v_buffer = @gzread($v_temp_tar, 512);

				// ----- Read the following blocks but not the last one
				if (!@gzeof($v_temp_tar)) {
					do{
						$v_binary_data = pack("a512", $v_buffer);
						$this->_writeBlock($v_binary_data);
						$v_buffer = @gzread($v_temp_tar, 512);

					} while (!@gzeof($v_temp_tar));
				}

				@gzclose($v_temp_tar);
			}
			elseif ($this->_compress_type == 'bz2') {
				$v_buffered_lines = array();
				$v_buffered_lines[] = @bzread($v_temp_tar, 512);

				// ----- Read the following blocks but not the last one
				while (strlen($v_buffered_lines[]
				= @bzread($v_temp_tar, 512)) > 0) {
					$v_binary_data = pack("a512",
					array_shift($v_buffered_lines));
					$this->_writeBlock($v_binary_data);
				}

				@bzclose($v_temp_tar);
			}

			if (!@unlink($this->_tarname.".tmp")) {
				$this->_error('Ошибка при удалении временного файла \''
				.$this->_tarname.'.tmp\'');
			}

		} else {
			// ----- For not compressed tar, just add files before the last
			// 512 bytes block
			if (!$this->_openReadWrite())
			return false;

			clearstatcache();
			$v_size = filesize($this->_tarname);
			fseek($this->_file, $v_size-512);
		}

		return true;
	}

	/**
	 * Append
	 * @param unknown_type $p_filelist
	 * @param unknown_type $p_add_dir
	 * @param unknown_type $p_remove_dir
	 * @return unknown
	 * @access private
	 */
	protected function _append($p_filelist, $p_add_dir='', $p_remove_dir='')
	{
		if (!$this->_openAppend())
		return false;

		if ($this->_addList($p_filelist, $p_add_dir, $p_remove_dir))
		$this->_writeFooter();

		$this->_close();

		return true;
	}

	/**
	 * Check if a directory exists and create it (including parent
	 * dirs) if not.
	 *
	 * @param string $p_dir directory to check
	 * @param string $chmod CHMOD
	 *
	 * @return bool TRUE if the directory exists or was created
	 */
	protected function _dirCheck($p_dir, $chmod = CHMOD)
	{
		if ((@is_dir($p_dir)) || ($p_dir == ''))
		{
			return TRUE;
		}

		$p_parent_dir = dirname($p_dir);

		if ($p_parent_dir != $p_dir && $p_parent_dir != '' && !$this->_dirCheck($p_parent_dir, $chmod))
		{
			return FALSE;
		}

		// Отрезаем последний слэш, если он был передан
		if (strlen($p_dir) > 2 && substr($p_dir, strlen($p_dir) - 1) == '/')
		{
			$p_dir = substr($p_dir, 0, strlen($p_dir) - 1);
		}

		$chmod > CHMOD && $chmod = CHMOD;

		if (!@mkdir($p_dir, $chmod))
		{
			$this->_error("Ошибка при создании директории '{$p_dir}'");
			return FALSE;
		}

		@chmod($p_dir, $chmod);

		return TRUE;
	}

	/**
	 * Compress path by changing for example "/dir/foo/../bar" to "/dir/bar",
	 * rand emove double slashes.
	 *
	 * @param string $p_dir path to reduce
	 *
	 * @return string reduced path
	 *
	 * @access private
	 *
	 */
	protected function _pathReduction($p_dir)
	{
		$v_result = '';

		// ----- Look for not empty path
		if ($p_dir != '') {
			// ----- Explode path by directory names
			$v_list = explode('/', $p_dir);

			// ----- Study directories FROM last to first
			for ($i=sizeof($v_list)-1; $i>=0; $i--) {
				// ----- Look for current path
				if ($v_list[$i] == ".") {
					// ----- Ignore this directory
					// Should be the first $i=0, but no check is done
				}
				else if ($v_list[$i] == "..") {
					// ----- Ignore it and ignore the $i-1
					$i--;
				}
				else if (($v_list[$i] == '')
				&& ($i!=(sizeof($v_list)-1))
				&& ($i!=0)) {
					// ----- Ignore only the double '//' in path,
					// but not the first and last /
				} else {
					$v_result = $v_list[$i].($i!=(sizeof($v_list)-1)?'/'
					.$v_result:'');
				}
			}
		}
		$v_result = strtr($v_result, '\\', '/');
		return $v_result;
	}

	/**
	 * {{{ _translateWinPath()
	 * @param string $p_path path
	 * @param boolean $p_remove_disk_letter remove disk letter
	 * @return string
	 */
	protected function _translateWinPath($p_path, $p_remove_disk_letter=true)
	{
		if (substr(PHP_OS, 0, 3) == 'WIN')
		{
			// ----- Look for potential disk letter
			if (($p_remove_disk_letter)
			&& (($v_position = strpos($p_path, ':')) != false)) {
				$p_path = substr($p_path, $v_position+1);
			}
			// ----- Change potential windows directory separator
			if ((strpos($p_path, '\\') > 0) || (substr($p_path, 0,1) == '\\')) {
				$p_path = strtr($p_path, '\\', '/');
			}
		}
		return $p_path;
	}

	/**
	 * Fix bug gzopen -> gzopen64
	 * http://www.hostcms.ru/forums/2/10759/
	 */
	public function gzopen($filename, $mode, $use_include_path = 0)
	{
		$sFunctionName = function_exists('gzopen')
			? 'gzopen'
			: 'gzopen64';

		return $sFunctionName($filename, $mode, $use_include_path);
	}
}

/**
 * Array helper
 *
 * @package HostCMS
 * @subpackage Core
 * @version 7.x
 * @author Hostmake LLC
 * @copyright © 2005-2022 ООО "Хостмэйк" (Hostmake LLC), http://www.hostcms.ru
 */
class Core_Array
{
	/**
	 * Get value for $key in array $array. If value does not exist will return defaultValue.
	 *
 	 * <code>
	 * $array = array('fruit' => 'apple', 'baz' => 'quz');
	 * // Return 'apple'
	 * $value = Core_Array::get($array, 'fruit');
	 *
	 * // Return NULL
	 * $value = Core_Array::get($array, 'foo');
	 *
	 * // Return 'bar'
	 * $value = Core_Array::get($array, 'foo', 'bar');
	 * </code>
	 * @param array $array array
	 * @param string $key key
	 * @param mixed $defaultValue default value
	 * @param mixed $filter filter, e.g. 'str'|'string'|'strval', 'int'|'integer'|'intval', 'float'|'floatval', 'bool'|'boolean'|'boolval', 'trim'
	 * @return mixed
	 */
	static public function get($array, $key, $defaultValue = NULL, $filter = NULL)
	{
		return self::_filter(
			is_array($array) && array_key_exists($key, $array)
				? $array[$key]
				: $defaultValue,
			$filter
		);
	}
	

	/**
	 * Filter Value
	 * @param mixed $value
	 * @param mixed $filter filter, e.g. 'str'|'string'|'strval', 'int'|'integer'|'intval', 'float'|'floatval', 'bool'|'boolean'|'boolval', 'trim'
	 * @return mixed
	 */
	static protected function _filter($value, $filter)
	{
		if (!is_null($filter))
		{
			switch ($filter)
			{
				case 'str':
				case 'string':
				case 'strval':
					$value = is_scalar($value)
						? strval($value)
						: '';
				break;
				case 'trim':
					$value = is_scalar($value)
						? trim($value)
						: '';
				break;
				case 'int':
				case 'integer':
				case 'intval':
					$value = is_scalar($value)
						? intval($value)
						: 0;
				break;
				case 'float':
				case 'floatval':
					$value = is_scalar($value)
						? floatval($value)
						: 0.0;
				break;
				case 'bool':
				case 'boolean':
				case 'boolval':
					$value = is_scalar($value)
						? (function_exists('boolval')
							? boolval($value)
							: (bool)$value
						)
						: FALSE;
				break;
				case 'array':
					$value = is_array($value)
						? $value
						: array();
				break;
				default:
					throw new Core_Exception('Core_Array wrong \'%name\' filter name', array('%name' => $filter));

			}
		}

		return $value;
	}
}

/**
 * File helper
 *
 * @package HostCMS
 * @version 7.x
 * @author Hostmake LLC
 * @copyright © 2005-2012 ООО "Хостмэйк" (Hostmake LLC), http://www.hostcms.ru
 */
class Core_File
{
	/**
	 * Moves an uploaded file to a new location
	 * @param string $fileName Path to the source file.
	 * @param string $destinaftion The destination path.
	 * @param int $chmod The mode parameter consists of three octal number components specifying access, e.g. 0644
	 */
	static public function moveUploadedFile($fileName, $destination, $chmod = CHMOD_FILE)
	{
		if (is_uploaded_file($fileName))
		{
			if (move_uploaded_file($fileName, $destination))
			{
				chmod($destination, $chmod);
			}
			else
			{
				throw new Core_Exception("Move uploaded file '%fileName' error.",
					array('%fileName' => Core_Exception::cutRootPath($fileName)));
			}
		}
		else
		{
			throw new Core_Exception("The file '%fileName' is not uploaded file.",
				array('%fileName' => Core_Exception::cutRootPath($fileName)));
		}
	}

	/**
	 * Copies file
	 * @param string $source The source path.
	 * @param string $destination The destination path.
	 * @param int $chmod The mode parameter consists of three octal number components specifying access, e.g. 0644
	 * @return bool
	 */
	static public function copy($source, $destination, $chmod = CHMOD_FILE)
	{
		if (is_file($source))
		{
			// Create destination dir
			self::mkdir(dirname($destination), CHMOD, TRUE);

			if ($source != $destination)
			{
				if (copy($source, $destination))
				{
					chmod($destination, $chmod);
					return TRUE;
				}
				else
				{
					throw new Core_Exception("Copy file '%source' error.",
						array('%source' => Core_Exception::cutRootPath($source)));
				}
			}
			return TRUE;
		}
		else
		{
			throw new Core_Exception("The file '%source' does not exist.",
				array('%source' => Core_Exception::cutRootPath($source)));
		}
	}

	/**
	 * Copies directory
	 * @param string $source The source directory.
	 * @param string $target The destination directory.
	 * @return bool
	 */
	static public function copyDir($source, $target)
	{
		$source = self::pathCorrection($source);
		$target = self::pathCorrection($target);

		if (is_dir($source) && !is_link($source))
		{
			if (!is_dir($target))
			{
				self::mkdir($target);
			}

			if ($dh = @opendir($source))
			{
				while (($file = @readdir($dh)) !== FALSE)
				{
					if ($file != '.' && $file!='..')
					{
						clearstatcache();

						is_file($source . DIRECTORY_SEPARATOR . $file)
							? self::copy($source . DIRECTORY_SEPARATOR . $file, $target . DIRECTORY_SEPARATOR . $file)
							: self::copyDir($source . DIRECTORY_SEPARATOR . $file, $target . DIRECTORY_SEPARATOR . $file);
					}
				}
				@closedir($dh);
			}
			else
			{
				throw new Core_Exception("Open dir '%source' error.",
					array('%source' => Core_Exception::cutRootPath($source)));
			}
		}
		else
		{
			return FALSE;
		}

		return TRUE;
	}

	/**
	 * Copy or move uploaded file
	 * @param string $source The source path.
	 * @param string $destination The destination path.
	 * @param int $chmod The mode parameter consists of three octal number components specifying access, e.g. 0644
	 * @see Core_File::moveUploadedFile()
	 * @see Core_File::copy()
	 */
	static public function upload($source, $destination, $chmod = CHMOD_FILE)
	{
		return is_uploaded_file($source)
			? self::moveUploadedFile($source, $destination, $chmod)
			: self::copy($source, $destination, $chmod);
	}

	/**
	 * Renames a file or directory
	 * @param string $oldname The old name.
	 * @param string $newname The new name.
	 */
	static public function rename($oldname, $newname)
	{
		if (is_file($oldname))
		{
			if (!rename($oldname, $newname))
			{
				throw new Core_Exception("Rename file '%oldname' error.",
					array('%oldname' => Core_Exception::cutRootPath($oldname)));
			}
		}
		else
		{
			throw new Core_Exception("The file '%oldname' does not exist.",
				array('%oldname' => Core_Exception::cutRootPath($oldname)));
		}
	}

	/**
	 * Deletes a file
	 * @param string $fileName Path to the file.
	 */
	static public function delete($fileName)
	{
		if (is_file($fileName))
		{
			if (!unlink($fileName))
			{
				throw new Core_Exception("Delete file '%fileName' error.",
					array('%fileName' => Core_Exception::cutRootPath($fileName)));
			}
		}
		else
		{
			throw new Core_Exception("The file '%fileName' does not exist.",
				array('%fileName' => Core_Exception::cutRootPath($fileName)));
		}
	}

	/**
	 * Deletes a directory with files and subdirectories
	 * @param string $dirname Path to the directory.
	 */
	static public function deleteDir($dirname)
	{
		$dirname = realpath(self::pathCorrection($dirname) . DIRECTORY_SEPARATOR);

		// Forbidden to delete home directory
		if (strtolower($dirname) == strtolower(CMS_FOLDER))
		{
			throw new Core_Exception("Forbidden to delete home directory.");
		}

		if ($dirname !== FALSE && strpos($dirname, CMS_FOLDER) !== 0)
		{
			throw new Core_Exception("Forbidden to delete directory out of CMS_FOLDER.");
		}

		if (is_dir($dirname) && !is_link($dirname))
		{
			if ($dh = @opendir($dirname))
			{
				while (($file = readdir($dh)) !== FALSE)
				{
					if ($file != '.' && $file != '..')
					{
						clearstatcache();
						$pathName = $dirname . DIRECTORY_SEPARATOR . $file;

						if (is_file($pathName))
						{
							self::delete($pathName);
						}
						elseif (is_dir($pathName))
						{
							self::deleteDir($pathName);
						}
					}
				}

				closedir($dh);
				clearstatcache();

				if (is_dir($dirname) && !@rmdir($dirname))
				{
					return FALSE;
				}
			}
		}
		else
		{
			return FALSE;
		}

		return TRUE;
	}

	/**
	 * Binary-safe file write
	 * @param string $fileName Path to the file.
	 * @param string $content The string that is to be written.
	 * @param int $chmod The mode parameter consists of three octal number components specifying access, e.g. 0644
	 */
	static public function write($fileName, $content, $chmod = CHMOD_FILE)
	{
		if (($handle = fopen($fileName, 'w')) && flock($handle, LOCK_EX))
		{
			if (fwrite($handle, $content) === FALSE)
			{
				flock($handle, LOCK_UN);
				fclose($handle);

				throw new Core_Exception("File '%fileName' write error.",
					array('%fileName' => Core_Exception::cutRootPath($fileName)));
			}

			flock($handle, LOCK_UN);
			fclose($handle);

			@chmod($fileName, $chmod);
			return TRUE;
		}
		else
		{
			throw new Core_Exception("File '%fileName' open error .",
				array('%fileName' => Core_Exception::cutRootPath($fileName)));
		}
	}

	static public function read($fileName)
	{
		if (is_file($fileName))
		{
			return file_get_contents($fileName);
		}
		else
		{
			throw new Core_Exception("The file '%fileName' does not exist.",
				array('%fileName' => Core_Exception::cutRootPath($fileName)));
		}
	}

	/**
	 * Makes directory
	 * @param string $pathname The directory path.
	 * @param int $chmod The mode parameter consists of three octal number components specifying access, e.g. 0644
	 * @param int $recursive Allows the creation of nested directories specified in the pathname. Defaults to FALSE.
	 */
	static public function mkdir($pathname, $chmod = CHMOD, $recursive = FALSE)
	{
		if (!is_dir($pathname) && !is_link($pathname))
		{
			if (mkdir($pathname, $chmod, $recursive))
			{
				chmod($pathname, $chmod);
			}
			else
			{
				throw new Core_Exception("The directory '%pathname' does not create.",
					array('%pathname' => Core_Exception::cutRootPath($pathname)));
			}
		}
	}

	static public function getExtension($path)
	{
		return strtolower(substr(strrchr($path, "."), 1));
	}

	static public function isValidExtension($path, array $aExtensions, $case = FALSE)
	{
		$sExtension = self::getExtension($path);

		if ($case)
		{
			return in_array($sExtension, $aExtensions);
		}
		else
		{
			foreach ($aExtensions AS $extension)
			{
				if (strtolower($sExtension) == strtolower($extension))
				{
					return TRUE;
				}
			}
		}

        return FALSE;
	}

	static public function convertfileNameToLocalEncoding($fileName)
	{
		return @iconv("UTF-8", "Windows-1251//IGNORE//TRANSLIT", $fileName);
	}

	static public function convertfileNameFromLocalEncoding($fileName)
	{
		return @iconv("Windows-1251", "UTF-8//IGNORE//TRANSLIT", $fileName);
	}

	static public function flush()
	{
		flush();
		ob_get_length() !== FALSE && ob_flush();
	}
}

/**
 * Exceptions
 *
 * @package HostCMS
 * @version 7.x
 * @author Hostmake LLC
 * @copyright © 2005-2012 ООО "Хостмэйк" (Hostmake LLC), http://www.hostcms.ru
 */
class Core_Exception extends Exception
{
	/**
	 * Constructor.
	 * Exception $previous = NULL just for PHP 5.3.0+
	 */
	public function __construct($message = NULL, array $values = array(), $code = 0, $bShowDebugTrace = TRUE, $status = 0, $log = TRUE)
	{
		if (!is_null($message) && !empty($values))
		{
			$values = array_map('htmlspecialchars', $values);
			$message = str_replace(array_keys($values), array_values($values), $message);
		}

		if ($bShowDebugTrace)
		{
			$aDebugTrace = $this->getDebugTrace();

			foreach ($aDebugTrace AS $aTrace)
			{
				$message .= "\n<br />{$aTrace['line']} {$aTrace['file']}";
			}
		}

		parent::__construct($message, $code);
	}

	protected function getDebugTrace()
	{
		$debug_backtrace = debug_backtrace();

		$aDebugTrace = array();

		foreach ($debug_backtrace AS $history)
		{
			if (isset($history['file']) && isset($history['line']))
			{
				$history['file'] = self::cutRootPath($history['file']);

				$aDebugTrace[] = array('file' => $history['file'], 'line' => $history['line']);
			}
		}

		return $aDebugTrace;
	}

	static public function cutRootPath($path)
	{
		if (strpos($path, dirname(CMS_FOLDER)) === 0)
		{
			$path = substr($path, strlen(CMS_FOLDER));
		}

		return $path;
	}
}