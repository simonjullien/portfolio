# SCSS Framework
We use a framework very similar to the [SMACSS](http://www.smacss.com/) approach.

## Categorizing CSS Rules 
"...an attempt to document a consistent approach to site development when using CSS".  

#### BASE
Default styling for basic html elements.  
ie: H1-H4, text, links and body backgrounds.

	body {
	 margin: 0; 
	 background: black;
	}
	a { color: #039; }
	h1 { font-size:20px; color:blue; }
	h2 { font-size:16px; }
	h3 { font-size:12px; }

#### VIEWS
Structural styling to lay out modules.  
ie: header, footer, sections.  
Focus on positioning and structural properties ONLY  
Work quickly to get design to level where developers can start getting things working with javascript

	header {
	 position:absolute;
	 top:0px;
	 padding:10px;
	 width:100%;
	}
	header .logo {
	 float:right;
	}

#### MODULES
Styling of discrete components of the page.  
ie: navigation bar, carousels, widgets  
Minimise layout rules (Try to only layout elements within the module)  
Isolate modules from each other – use a style tile (See build\deploy\STYLE_TILE for an example)

	.logo {
	 width:200px;
	 height:100px;
	 background:blue;
	}
	.logo strong {
	 font-size:14px;
	 text-transform:uppercase;
	}

#### STATES
Styling of arguments to overide styles.  
These are often classes added to modules with JS.  
ie: is-active, is-disabled, is-error.

	.module {
	 visiblilty:hidden;
	}
	.module.is-open {
	 visiblilty:visible;
	}
	.module.is-error {
	 background:red;
	}

## File structure
You can find this file structure in build\scss

###### all.scss
Main Stylesheet. Import all active SCSS documents here.
You can also add: Screen.scss, Print.scss, Mobile.scss etc at this level.

#### BASE folder

###### default.scss
Default styling for base elements.  
ie: headings, text, links and body backgrounds

###### fonts.scss
Setup font-face CSS and font styles to @extend.  
ie: regularFont, italicFont, boldFont, displayFont

###### mixins.scss
Setup Sass @mixins for use throughout your CSS.  
ie: imageReplacement, hidden, clearFix  
Use compass CSS3 Mixins

###### reset.scss
Standard CSS reset.

###### variables.scss
Set global Sass Variables here.  
ie: $primaryTxtColor, $secondaryTextColor, $bgColor  
Also pays to keep a list of all z-indexes here.

#### VIEWS folder
Folder to contain all layout/view styles. Create a seperate SCSS document per view.
ie: header, footer, sections.

#### MODULES folder
Folder to contain all module styles. Create a seperate SCSS document per module type.  
ie: navigation bar, carousels, widgets.

## Process

##### 1. Planning
Using signed off designs as reference breakdown elements into MODULES and VIEWS. Give names to all of the components. Plan structure of SCSS files and prioritise sections.

##### 2. Write basic html markup and setup Style Tile
Start with big picture structure. Keep it semantic. To keep things consistent ONE developer should take ownership of writing the HTML.

##### 3. BASE styles
Setup and test web fonts for the project in _fonts.scss.  
Set default varaibles such as colours and font sizes in _variables.scss  
Using the Style Tile as a starting point go through and set default styles for base elements such as body text, headings, form elements and background styles in _default.scss.

##### 4. VIEWS styles
Style the basic layout and structure of the project. Start with the site shell before going through each view one by one. Ignore the content - focus on structure only. Save stylesheets in the VIEWS folder.

##### 5. MODULES and STATE styles
Once the structure is in place return to your Style Tile and create/style each module one by one. Breakdown modules into sepeate stylesheets. Each module should be stand-alone and self sufficient. Remember to include states (ie: is-open, is-closed) where relevent.

##### 6. Bring MODULES into VIEWS
Copy module html from your Style Tile into the views. From here work between Style Tile and main project files. Try to keep html in Style Tile as up to date as possible.

##### 7. Testing
Test the Style Tile and the main project in required browsers as often as possible. Use the W3 HTML validator to find holes in your markup.

## Using Compass

###### Use compass for sprites 
Place images in a folder and Compass automatically generates spritesheets you can reference in SCSS. Read more on the [Compass website.](http://www.compass-style.org/)

###### Use compass for retina 
Compass mixins can automatically resize your spritesheets for retina displays.

## Required reading
- [SMACSS: Scalable and Modular Architecture for CSS](http://www.smacss.com/)
- [SASS: Syntactically Awesome Stylesheets](http://www.sass-lang.com/)
- [Compass: Open-source CSS Authoring Framework.](http://www.compass-style.org/)