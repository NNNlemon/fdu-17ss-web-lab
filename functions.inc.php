<?php

function generateLink($url, $label, $class) {
   $link = '<a href="' . $url . '" class="' . $class . '">';
   $link .= $label;
   $link .= '</a>';
   return $link;
}


function outputPostRow($number)  {
    include("travel-data.inc.php");
    $index = $number - 1;
    $data = array(
        array($postId1,$userId1,$userName1,$date1,$thumb1,$title1,$excerpt1,$reviewsNum1,$reviewsRating1),
        array($postId2,$userId2,$userName2,$date2,$thumb2,$title2,$excerpt2,$reviewsNum2,$reviewsRating2),
        array($postId3,$userId3,$userName3,$date3,$thumb3,$title3,$excerpt3,$reviewsNum3,$reviewsRating3),
    );
    $postUrl = 'post.php?id=' . $data[$index][0];
    $userUrl = 'user.php?id=' . $data[$index][1];
    $label = '<img src="images/' . $data[$index][4] . '" alt=' . $data[$index][5] . ' class="img-responsive">';
    $html = '<div class="row"><div class="col-md-4">' . generateLink($postUrl,$label,'') .
        '</div><div class="col-md-8"><h2>' .
        $data[$index][5] . '</h2><div class="details">Posted by ' . generateLink($userUrl,$data[$index][2],'') .
        '<span class="pull-right">' . $data[$index][3] . '</span><p class="ratings">' .
        constructRating($data[$index][8]) . ' ' . $data[$index][7] . ' Reviews</p></div><p class="excerpt">' .
        $data[$index][6] . '</p><p>' . generateLink($postUrl,'Read more','btn btn-primary btn-sm') .
        '</p></div></div><hr/>';
    echo $html;
}

/*
  Function constructs a string containing the <img> tags necessary to display
  star images that reflect a rating out of 5
*/
function constructRating($rating) {
    $imgTags = "";
    
    // first output the gold stars
    for ($i=0; $i < $rating; $i++) {
        $imgTags .= '<img src="images/star-gold.svg" width="16" />';
    }
    
    // then fill remainder with white stars
    for ($i=$rating; $i < 5; $i++) {
        $imgTags .= '<img src="images/star-white.svg" width="16" />';
    }    
    
    return $imgTags;    
}

?>