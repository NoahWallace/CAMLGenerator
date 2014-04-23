CAMLGenerator custom jquery  plugin by Noah Wallace;

This is a very simple plug in designed to create sharepoint CAML Queries based on array information in a specific format.

Warning: This Plugin can support CAML Server Variables if manually entered as a string Ex:"<Today />" or "<Today OffsetDays='-5'/>"

Let me get right to it

$().CAMLgenerator();

This Plugin has two parameters to pass into the function. The first position is required.The first position below contains the array of Criteria that you will pass into the CAML Query.

$().CAMLgenerator([[["Eq","Title","My Title","Text"]]]);
$().CAMLgenerator(x);

Array Format and Examples
Array=[[["Logical Operator","Static Field Name","Criteria Value","Field Type"]]]

Break down: [ \\Container Start
		[\\Or Start
			[\\And Start
				(contains Criteria)
			]\\And End
		],\\Or End
		[\\Or Start
			[\\And Start
				(contains Criteria)
			]\\And End
		],\\Or End
	    ] \\Container End

Example 1:
	var x=[
	 	[    
			["Geq","StartDate","2014-01-01T12:00:00Z","Date"],
			["Leq","EndDate","2014-03-01T12:00:00Z","Date"]
		],
		[
			["Eq","Title","My Title","Text"]
		]
	      ];
Example 2:
var x=[
		[
			["Eq","Title","My Title","Text"]
		]
	];
Example 3:
var x=[
		[
			["Geq","Static1","Value1","Date"],
			["Geq","Static1","Value1","Date"]
		],
		[
			["Geq","Static1","Value4","Date"]
		]
	];
Example 4:
var x=[
		[
			["Eq","Title","Your Title","Text"]
		],
		[
			["Eq","Title","My Title","Text"]
		],
		[
			["Eq","Title","Their Title","Text"]
		]
	];
	
The Second Parameter you can pass is the options portion
$().CAMLgenerator(x,{});

There are three options in this plugin currently;

The first option is "rowLimit". this Option requires a number;

{rowlimit:5}

The second option is "order". this option accepts arrays in regard to the sort order;

{order:[["Field 1 Static Name","Asc"],["Field 2 Static Name","Desc"]]}

The third option is "viewFields". this option is a simple array of fields you would like to pull in the caml filter;
(viewFields:["field1","field2"])

To put it all together

$().CAMLgenerator(x,{rowLimit:5,
						order:[["Title","Desc"],
						viewFields:'']})

Returns

<Query>
	<Where>
		<Or>
			<Eq>
				<FieldRef Name='Title'/>
				<Value Type='Text'/>Your Title</Value>
			</Eq>
			<Eq>
				<FieldRef Name='Title'/>
				<Value Type='Text'/>My Title</Value>
			</Eq>
		</Or>
	</Where>
	<OrderBy>
		<FieldRef Name='Title' Ascending='FALSE'/>
	</OrderBy>
</Query>