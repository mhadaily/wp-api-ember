# Wordpress REST Api and Ember.js Boilerplate

This repository will help you to quickly setup a project to get data from 
Wordpress website via wp-json/v2 api plugins. 

## Project Structure
````
--app
  |---adapter
     |---application.js //  handle connection to wordpress
  |---serializer
     |---application.js // serializer data as RESTAPI Adapter expects
  |----route 
     |---pages.js  //get all pages based on pagination number
     |---posts.js  //get all posts based on pagination number
  |----model
     |---page.js
     |---post.js
  |----template
     |---pages.hbs
     |---posts.hbs
---config
  |---environment.js // add wp-host here
````
### CUSTOM POST TYPE:
Since the basic of WP is in place you it's very easy to add your custom post type 
as a model. You may or may not need to have different serializer. However, The concept of
 creating model or serializer even different adapter if needed for custom post type
 is as exactly as what I have done for pages and post.
 
 ````php
 /**
  * Register a book post type, with REST API support
  *
  * Based on example at: https://codex.wordpress.org/Function_Reference/register_post_type
  */
 add_action( 'init', 'my_book_cpt' );
 function my_book_cpt() {
     $args = array(
       'public'       => true,
       'show_in_rest' => true,
       'label'        => 'Books'
     );
     register_post_type( 'book', $args );
 }
 ````
Full example of registering Custom post type to be appeared in REST Api.
 
 ````php
 /**
  * Register a book post type, with REST API support
  *
  * Based on example at: https://codex.wordpress.org/Function_Reference/register_post_type
  */
 add_action( 'init', 'my_book_cpt' );
 function my_book_cpt() {
   $labels = array(
     'name'               => _x( 'Books', 'post type general name', 'your-plugin-textdomain' ),
     'singular_name'      => _x( 'Book', 'post type singular name', 'your-plugin-textdomain' ),
     'menu_name'          => _x( 'Books', 'admin menu', 'your-plugin-textdomain' ),
     'name_admin_bar'     => _x( 'Book', 'add new on admin bar', 'your-plugin-textdomain' ),
     'add_new'            => _x( 'Add New', 'book', 'your-plugin-textdomain' ),
     'add_new_item'       => __( 'Add New Book', 'your-plugin-textdomain' ),
     'new_item'           => __( 'New Book', 'your-plugin-textdomain' ),
     'edit_item'          => __( 'Edit Book', 'your-plugin-textdomain' ),
     'view_item'          => __( 'View Book', 'your-plugin-textdomain' ),
     'all_items'          => __( 'All Books', 'your-plugin-textdomain' ),
     'search_items'       => __( 'Search Books', 'your-plugin-textdomain' ),
     'parent_item_colon'  => __( 'Parent Books:', 'your-plugin-textdomain' ),
     'not_found'          => __( 'No books found.', 'your-plugin-textdomain' ),
     'not_found_in_trash' => __( 'No books found in Trash.', 'your-plugin-textdomain' )
   );
  
   $args = array(
     'labels'             => $labels,
     'description'        => __( 'Description.', 'your-plugin-textdomain' ),
     'public'             => true,
     'publicly_queryable' => true,
     'show_ui'            => true,
     'show_in_menu'       => true,
     'query_var'          => true,
     'rewrite'            => array( 'slug' => 'book' ),
     'capability_type'    => 'post',
     'has_archive'        => true,
     'hierarchical'       => false,
     'menu_position'      => null,
     'show_in_rest'       => true,
     'rest_base'          => 'books',
     'rest_controller_class' => 'WP_REST_Posts_Controller',
     'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
   );
  
   register_post_type( 'book', $args );
 }
 ````
 
Register a genre post type, with REST API support
 
````php
/**
 * Based on example at: https://codex.wordpress.org/Function_Reference/register_taxonomy
 */
add_action( 'init', 'my_book_taxonomy', 30 );
function my_book_taxonomy() {
 
  $labels = array(
    'name'              => _x( 'Genres', 'taxonomy general name' ),
    'singular_name'     => _x( 'Genre', 'taxonomy singular name' ),
    'search_items'      => __( 'Search Genres' ),
    'all_items'         => __( 'All Genres' ),
    'parent_item'       => __( 'Parent Genre' ),
    'parent_item_colon' => __( 'Parent Genre:' ),
    'edit_item'         => __( 'Edit Genre' ),
    'update_item'       => __( 'Update Genre' ),
    'add_new_item'      => __( 'Add New Genre' ),
    'new_item_name'     => __( 'New Genre Name' ),
    'menu_name'         => __( 'Genre' ),
  );
 
  $args = array(
    'hierarchical'          => true,
    'labels'                => $labels,
    'show_ui'               => true,
    'show_admin_column'     => true,
    'query_var'             => true,
    'rewrite'               => array( 'slug' => 'genre' ),
    'show_in_rest'          => true,
    'rest_base'             => 'genre',
    'rest_controller_class' => 'WP_REST_Terms_Controller',
  );
 
  register_taxonomy( 'genre', array( 'book' ), $args );
 
}
````
 
### ACF

This is an example that how you are able to customize WP REST API and and ACF to get_callback

In this example CUSTOMPOSTTYPE is your custom post type and can be any other post type in wordpress such as post , page and ...

````php
add_action( 'rest_api_init', 'slug_register_acf_random' );
function slug_register_acf_random() {
    register_rest_field( 'CUSTOMPOSTTYPE',
        'acf',
        array(
            'get_callback'    => 'slug_get_acf',
            'update_callback' => '',
            'schema'          => null,
        )
    );
}

function slug_get_acf( $object, $field_name, $request ) {
    if (function_exists('get_fields')) {
        return get_fields($data['id']);
    }
    return [];
}
````


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd wp-api-ember`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
