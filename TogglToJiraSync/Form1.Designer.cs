namespace TogglToJiraSync {
	partial class Form1 {
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if (disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			this.Button_GetEntries = new System.Windows.Forms.Button();
			this.DateTimePicker_StartDate = new System.Windows.Forms.DateTimePicker();
			this.DateTimePicker_EndDate = new System.Windows.Forms.DateTimePicker();
			this.Button_SaveToJira = new System.Windows.Forms.Button();
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.CheckedListBox_TimeEntries = new System.Windows.Forms.CheckedListBox();
			this.groupBox1 = new System.Windows.Forms.GroupBox();
			this.groupBox1.SuspendLayout();
			this.SuspendLayout();
			// 
			// Button_GetEntries
			// 
			this.Button_GetEntries.Location = new System.Drawing.Point(150, 86);
			this.Button_GetEntries.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
			this.Button_GetEntries.Name = "Button_GetEntries";
			this.Button_GetEntries.Size = new System.Drawing.Size(127, 28);
			this.Button_GetEntries.TabIndex = 0;
			this.Button_GetEntries.Text = "Get Time Entries";
			this.Button_GetEntries.UseVisualStyleBackColor = true;
			this.Button_GetEntries.Click += new System.EventHandler(this.Button_GetEntries_Click);
			// 
			// DateTimePicker_StartDate
			// 
			this.DateTimePicker_StartDate.Location = new System.Drawing.Point(87, 22);
			this.DateTimePicker_StartDate.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
			this.DateTimePicker_StartDate.Name = "DateTimePicker_StartDate";
			this.DateTimePicker_StartDate.Size = new System.Drawing.Size(265, 22);
			this.DateTimePicker_StartDate.TabIndex = 1;
			// 
			// DateTimePicker_EndDate
			// 
			this.DateTimePicker_EndDate.Location = new System.Drawing.Point(87, 54);
			this.DateTimePicker_EndDate.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
			this.DateTimePicker_EndDate.Name = "DateTimePicker_EndDate";
			this.DateTimePicker_EndDate.Size = new System.Drawing.Size(265, 22);
			this.DateTimePicker_EndDate.TabIndex = 2;
			// 
			// Button_SaveToJira
			// 
			this.Button_SaveToJira.Location = new System.Drawing.Point(13, 288);
			this.Button_SaveToJira.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
			this.Button_SaveToJira.Name = "Button_SaveToJira";
			this.Button_SaveToJira.Size = new System.Drawing.Size(100, 28);
			this.Button_SaveToJira.TabIndex = 4;
			this.Button_SaveToJira.Text = "Save to Jira";
			this.Button_SaveToJira.UseVisualStyleBackColor = true;
			this.Button_SaveToJira.Click += new System.EventHandler(this.Button_SaveToJira_Click);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Location = new System.Drawing.Point(15, 26);
			this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(35, 16);
			this.label1.TabIndex = 5;
			this.label1.Text = "Start";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Location = new System.Drawing.Point(15, 54);
			this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(32, 16);
			this.label2.TabIndex = 6;
			this.label2.Text = "End";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Location = new System.Drawing.Point(16, 150);
			this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(83, 16);
			this.label3.TabIndex = 7;
			this.label3.Text = "Time Entries";
			// 
			// CheckedListBox_TimeEntries
			// 
			this.CheckedListBox_TimeEntries.FormattingEnabled = true;
			this.CheckedListBox_TimeEntries.Location = new System.Drawing.Point(16, 174);
			this.CheckedListBox_TimeEntries.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
			this.CheckedListBox_TimeEntries.Name = "CheckedListBox_TimeEntries";
			this.CheckedListBox_TimeEntries.Size = new System.Drawing.Size(781, 106);
			this.CheckedListBox_TimeEntries.TabIndex = 8;
			// 
			// groupBox1
			// 
			this.groupBox1.Controls.Add(this.label1);
			this.groupBox1.Controls.Add(this.DateTimePicker_StartDate);
			this.groupBox1.Controls.Add(this.label2);
			this.groupBox1.Controls.Add(this.DateTimePicker_EndDate);
			this.groupBox1.Controls.Add(this.Button_GetEntries);
			this.groupBox1.Location = new System.Drawing.Point(20, 10);
			this.groupBox1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
			this.groupBox1.Name = "groupBox1";
			this.groupBox1.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
			this.groupBox1.Size = new System.Drawing.Size(428, 120);
			this.groupBox1.TabIndex = 9;
			this.groupBox1.TabStop = false;
			this.groupBox1.Text = "Toogl Time Entries";
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(815, 329);
			this.Controls.Add(this.groupBox1);
			this.Controls.Add(this.CheckedListBox_TimeEntries);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.Button_SaveToJira);
			this.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
			this.Name = "Form1";
			this.Text = "Form1";
			this.groupBox1.ResumeLayout(false);
			this.groupBox1.PerformLayout();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Button Button_GetEntries;
		private System.Windows.Forms.DateTimePicker DateTimePicker_StartDate;
		private System.Windows.Forms.DateTimePicker DateTimePicker_EndDate;
		private System.Windows.Forms.Button Button_SaveToJira;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.CheckedListBox CheckedListBox_TimeEntries;
		private System.Windows.Forms.GroupBox groupBox1;
	}
}

