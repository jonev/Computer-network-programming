﻿using System;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Drawing;

namespace WebsocketServer
{
    public class Clicker : Form
    {
        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(long dwFlags, long dx, long dy, long cButtons, long dwExtraInfo);

        private const int MOUSEEVENTF_LEFTDOWN = 0x02;
        private const int MOUSEEVENTF_LEFTUP = 0x04;
        private const int MOUSEEVENTF_RIGHTDOWN = 0x08;
        private const int MOUSEEVENTF_RIGHTUP = 0x10;

        public Clicker()
        {
        }

        public void DoMouseClick(int X, int Y)
        {
            //Call the imported function with the cursor's current position
            //int X = Cursor.Position.X;
            //int Y = Cursor.Position.Y;
            this.Cursor = new Cursor(Cursor.Current.Handle);
            Cursor.Position = new Point(X, Y);
            mouse_event(MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP, X+1, Y, 0, 0);
        }
    }
}
