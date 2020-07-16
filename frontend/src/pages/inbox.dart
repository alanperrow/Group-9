import 'package:flutter/material.dart';

class Inbox extends StatefulWidget {
  @override
  _InboxState createState() => _InboxState();
}

class _InboxState extends State<Inbox>{
  int _counter = 0;

  void _incrementCounter(){
    setState((){
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('Inbox'),
        centerTitle: true,
        elevation: 0,
        ),
      body: Center(
        child: ListView.builder(
          itemBuilder: _itemBuilder,
          itemCount: 25,
        ),
      ),
    );
  }
  Widget _itemBuilder(BuildContext context, int index) {
    return Container(
        height: 40.0,
        child: Material(
          color: Colors.grey[200],
          elevation: 7.0,
          child: GestureDetector(
            onTap: () {
              print("Translate Morse message to English and display");
            },
            child: Center(
              child: Text(
                'From Sender $index: THIS WILL BE MORSE',
                style: TextStyle(
                    color: Colors.deepOrangeAccent,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Montserrat'),
              ),
            ),
          ),
        ),
      );
  }
}