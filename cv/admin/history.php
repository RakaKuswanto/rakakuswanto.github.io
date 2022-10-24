<?php
$db = new SQLite3('../db/db.db');

$edit = isset($_GET['edit']) ? $_GET['edit'] : '';
$delete = isset($_GET['delete']) ? $_GET['delete'] : '';
$editId = ''; $editTitle = ''; $editLevel = ''; $editDescription = ''; $editType = ''; $editDate = '';

$hId = isset($_POST['hId'])  ? $_POST['hId'] : '';
$hTitle   = isset($_POST['hTitle'])  ? $_POST['hTitle'] : '';
$hLevel   = isset($_POST['hLevel'])  ? $_POST['hLevel'] : '';
$hDescription   = isset($_POST['hDescription'])  ? $_POST['hDescription'] : '';
$hType   = isset($_POST['hType'])  ? $_POST['hType'] : '';
$hDate   = isset($_POST['hDate'])  ? $_POST['hDate'] : '';

// GET DATA FOR UPDATE FUNCTION
if ($edit != '') {
    $results = $db->query("SELECT * FROM t_history where id={$edit}");
    while ($row = $results->fetchArray()) {
        $editId = $row['id'];
        $editTitle = $row['title'];
        $editLevel = $row['level'];
        $editDescription = $row['desc'];
        $editType = $row['type'];
        $editDate = $row['date'];
    }
}

// INSERT
if ($hTitle != '' && $hId == '') {
    $db->query("INSERT INTO t_history (title, level, desc, type, date) VALUES ('{$hTitle}', '{$hLevel}', '{$hDescription}', '{$hType}', '{$hDate}')");
}

// UPDATE
if ($hTitle != '' && $hId != '') {
    $db->query("UPDATE t_history SET title = '{$hTitle}', level = '{$hLevel}', desc = '{$hDescription}', type = '{$hType}', date = '{$hDate}' WHERE id ={$hId}");
    header("location:history.php");
}

// DELETE
if($delete != ''){
    $db->query("DELETE FROM t_history WHERE id = {$delete}");
    header("location:history.php");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>CORK Admin - Multipurpose Bootstrap Dashboard Template </title>
    <link rel="icon" type="image/x-icon" href="/admin/assets/img/favicon.ico"/>
    <link href="/admin/assets/css/loader.css" rel="stylesheet" type="text/css" />
    <script src="/admin/assets/js/loader.js"></script>

    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <?php include('template/globalstyle.php'); ?>
    <!-- END GLOBAL MANDATORY STYLES -->

    <!-- BEGIN PAGE LEVEL /admin/plugins/CUSTOM STYLES -->
    <link href="/admin/plugins/apex/apexcharts.css" rel="stylesheet" type="text/css">
    <link href="/admin/assets/css/dashboard/dash_2.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/admin/plugins/table/datatable/datatables.css">
    <link rel="stylesheet" type="text/css" href="/admin/plugins/table/datatable/dt-global_style.css">
    <link rel="stylesheet" type="text/css" href="/admin/plugins/table/datatable/custom_dt_custom.css">
    <!-- END PAGE LEVEL /admin/plugins/CUSTOM STYLES -->

</head>
<body class="alt-menu sidebar-noneoverflow">
    <!-- BEGIN LOADER -->
    <?php include('template/loader.php'); ?>
    <!--  END LOADER -->

    <!--  BEGIN NAVBAR  -->
    <?php include('template/navbar.php'); ?>
    <!--  END NAVBAR  -->

    <!--  BEGIN MAIN CONTAINER  -->
    <div class="main-container" id="container">

        <div class="overlay"></div>
        <div class="search-overlay"></div>

        <!--  BEGIN TOPBAR  -->
        <?php include('template/topbar.php'); ?>
        <!--  END TOPBAR  -->
        
        <!--  BEGIN CONTENT PART  -->
        <div id="content" class="main-content">
            <div class="layout-px-spacing">

                <div class="page-header">
                    <div class="page-title">

                    </div>
                </div>

                <div class="row layout-top-spacing">

                    <div class="col-12 layout-spacing">
                        <div class="widget widget-card-two">
                            <div class="widget-content">
                                <div class="table-responsive mb-4 mt-4">
                                    <table id="zero-config" class="table style-1 table-hover non-hover" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th class='text-center'>Title</th>
                                                <th class='text-center'>Level</th>
                                                <th class='text-center'>Description</th>
                                                <th class='text-center'>Type</th>
                                                <th class='text-center'>Date</th>
                                                <th class="no-content">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php

                                                $results = $db->query('SELECT * FROM t_history');
                                                while ($row = $results->fetchArray()) {
                                                    print("<tr>");
                                                    print("<td class='text-center'>{$row['title']}</td>");
                                                    print("<td class='text-center'>{$row['level']}</td>");
                                                    print("<td class='text-center'>{$row['desc']}</td>");
                                                    print("<td class='text-center'>{$row['type']}</td>");
                                                    print("<td class='text-center'>{$row['date']}</td>");
                                                    print('
                                                    <td class="text-center">
                                                        <div class="dropdown custom-dropdown">
                                                            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                            </a>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink2">
                                                                <a class="dropdown-item" href="history.php?edit='.$row['id'].'">Edit</a>
                                                                <a class="dropdown-item" href="history.php?delete='.$row['id'].'">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    ');
                                                    print("</tr>");
                                                }
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="flHorizontalForm" class="col-lg-12 layout-spacing">
                        <div class="statbox widget box box-shadow">
                            <div class="widget-header">                                
                                <div class="row">
                                    <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                        <h4>Input Data</h4>
                                    </div>                                                                        
                                </div>
                            </div>
                            <div class="widget-content widget-content-area">
                                <form action="" method="post">
                                    <input type="hidden" value="<?=$editId?>" name="hId" id="hId">
                                    <div class="form-group row mb-4">
                                        <label for="hTitle" class="col-xl-2 col-sm-3 col-sm-2 col-form-label">Title</label>
                                        <div class="col-xl-10 col-lg-9 col-sm-10">
                                            <input type="text" class="form-control" value="<?=$editTitle?>" name="hTitle" id="hTitle" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label for="hLevel" class="col-xl-2 col-sm-3 col-sm-2 col-form-label">Level</label>
                                        <div class="col-xl-10 col-lg-9 col-sm-10">
                                            <input type="text" class="form-control" value="<?=$editLevel?>" name="hLevel" id="hLevel" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label for="hDescription" class="col-xl-2 col-sm-3 col-sm-2 col-form-label">Description</label>
                                        <div class="col-xl-10 col-lg-9 col-sm-10">
                                            <input type="text" class="form-control" value="<?=$editDescription?>" name="hDescription" id="hDescription" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label for="hType" class="col-xl-2 col-sm-3 col-sm-2 col-form-label">Type</label>
                                        <div class="col-xl-10 col-lg-9 col-sm-10">
                                            <input type="text" class="form-control" value="<?=$editType?>" name="hType" id="hType" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label for="hDate" class="col-xl-2 col-sm-3 col-sm-2 col-form-label">Date</label>
                                        <div class="col-xl-10 col-lg-9 col-sm-10">
                                            <input type="text" class="form-control" value="<?=$editDate?>" name="hDate" id="hDate" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-10">
                                            <button type="submit" class="btn btn-primary mt-3">Save</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <!--  END CONTENT PART  -->

    </div>
    <!-- END MAIN CONTAINER -->

    <!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
    <?php include('template/global.php'); ?>
    <!-- END GLOBAL MANDATORY SCRIPTS -->

    <!-- BEGIN PAGE LEVEL /admin/plugins/CUSTOM SCRIPTS -->
    <script src="/admin/plugins/table/datatable/datatables.js"></script>
    <script>
        $('#zero-config').DataTable({
            "oLanguage": {
                "oPaginate": { "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' },
                "sInfo": "Showing page _PAGE_ of _PAGES_",
                "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                "sSearchPlaceholder": "Search...",
               "sLengthMenu": "Results :  _MENU_",
            },
            "stripeClasses": [],
            "lengthMenu": [5, 10, 50],
            "pageLength": 5 
        });
    </script>
    <!-- BEGIN PAGE LEVEL /admin/plugins/CUSTOM SCRIPTS -->
</body>
</html>