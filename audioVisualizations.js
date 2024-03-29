
	/* This demo only works in Chrome. */
	var isChrome = (function() {
		var chrome = window.chrome,
			vendor = navigator.vendor;
		return chrome !== void 0 && chrome !== null && vendor === 'Google Inc.';
	})();
	if (!isChrome) document.querySelector('.not-chrome').classList.add('open');

	/* Hoist some variables. */
	var audio, context;

	/* Try instantiating a new AudioContext, throw an error if it fails. */
	try {
		/* Setup an AudioContext. */
		context = new AudioContext();
	} catch(e) {
		throw new Error('The Web Audio API is unavailable');
	}

	/* Create a script processor node with a `bufferSize` of 1024. */
	var processor = context.createScriptProcessor(1024),
	    /* Create an analyser node */
	    analyser = context.createAnalyser();

	/* Wire the processor into our audio context. */
	processor.connect(context.destination);
	/* Wire the analyser into the processor */
	analyser.connect(processor);

	/* Define a Uint8Array to receive the analysers data. */
	var data = new Uint8Array(analyser.frequencyBinCount);

	/* Start of the visual component, let's define some constants. */
	var NUM_OF_SLICES = Math.ceil(window.innerWidth / 21);

	/* Define a `Sound` Class */
	var Sound = {
	    /* Give the sound an element property initially undefined. */
	    element: undefined,
	    /* Define a class method of play which instantiates a new Media Element
	     * Source each time the file plays, once the file has completed disconnect
	     * and destroy the media element source. */
	    play: function() {
	    	clearInterval(fadeFake);
			/* Call `play` on the MediaElement. */
	        	this.element.play();
	    },
	    pause: function() {
	    	// if (document.getElementById("stop").disabled == true) {
	    		musicPlaying = true;
	    		fadeFake = setTimeout(function() {
	    			musicPlaying = false;
	    		}, 1000);
				this.element.pause();
	    	// }
	    },
	    setAudioStream: function() {
			/* Try instantiating a new AudioContext, throw an error if it fails. */
			try {
				/* Setup an AudioContext. */
		    	var sound = context.createMediaElementSource(this.element);
			} catch(e) {
				// var src = this.element.src;
				// var currentTime = this.element.currentTime;
				// this.element.pause();
	   //  		this.element = new Audio();
	   //  		this.element.src = src;
	   //  		this.element.currentTime = currentTime;
				// // context = new AudioContext();
		    	var sound = context.createMediaElementSource(this.element);
				// throw new Error('Bla bla bla bla bla');
			}
	        // this.element.onended = function() {
	        //     sound.disconnect();
	        //     sound = null;
	        //     /* Noop the audioprocess handler when the file finishes. */
	        //     processor.onaudioprocess = function() {};
	        // }
	        /* Add the following line to wire into the analyser. */
	        sound.connect(analyser);
	       	sound.connect(context.destination);

	       	processor.onaudioprocess = function() {
	       		analyser.fftSize = Math.pow(2, Math.ceil(Math.log2(NUM_OF_SLICES * 64)));
			    data = new Uint8Array(analyser.frequencyBinCount);
			    /* Populate the data array with the frequency data. */
			    // analyser.getByteTimeDomainData(data);
			    /* Populate the data array with the waveform data. */
				analyser.getByteFrequencyData(data);
			};
	    }
	};
	var fadeFake;
	/* Create an async function which returns a promise of a playable audio element. */
	function loadAudioElement(url, i) {
		return new Promise(function(resolve, reject) {
			var audio = new Audio();
			audio.addEventListener('canplay', function() {
								// console.log(i);
				/* Resolve the promise, passing through the element. */
				resolve([audio, i]);
			});
			/* Reject the promise on an error. */
			audio.addEventListener('error', reject);
			audio.src = url;
			// audio.setAttribute("loop", true);
			audio.crossOrigin = 'anonymous';
		});
	}
	var traxmachine = document.createElement("div");
	traxmachine.setAttribute("id", "traxmachine");
	document.getElementsByTagName("body")[0].appendChild(traxmachine);

	var collections = [null, ['1', 'DJ Fuse’s Duck Funk', '01.gif', '#89dc00'], ['2', 'DJ Fuse’s Habbo Theme', '02.gif', '#efb100'], ['3', 'SnowStorm Theme', '03.gif', '#ef00b8'], ['4', 'Sunset Adverture(s)', '04.gif', '#00d2dc'], ['5', 'Dark Skies', '05.gif', ''], ['6', 'Ambience(s)', '06.gif', ''], ['7', 'Furni Sounds I', '07.gif', ''], ['8', 'Electronica', '08.gif', ''], ['9', 'Mysto Magica', '09.gif', ''], ['10', 'Boy Band Sensation', '10.gif', ''], ['11', 'Spicey Donna', '11.gif', ''], ['12', 'Abe Normal', '12.gif', ''], ['13', 'Cafe Muzzakh', '13.gif', ''], ['14', 'Cameron’s Ex', '14.gif', ''], ['15', 'El Generico', '15.gif', ''], ['16', 'Ferry Nultado', '16.gif', ''], ['17', 'Jive Sideburns', '17.gif', ''], ['18', 'Little Tanga Beach', '18.gif', ''], ['19', 'MnM', '19.gif', ''], ['20', 'Monkey Paradise', '20.gif', ''], ['21', 'Snotty Day', '21.gif', ''], ['22', 'A Day in the Park', '22.gif', ''], ['23', 'Nature Nightlife', '23.gif', ''], ['24', 'Compu FX', '24.gif', ''], ['25', 'Party Pack', '25.gif', ''], ['26', 'Bhangra Mangra', '26.gif', ''], ['27', 'Rasta Santa’s Pack', '27.gif', ''], ['28', 'Moshy Metal', '28.gif', ''], ['29', 'Dancefloor Burners', '29.gif', ''], ['30', 'Double Peaks', '30.gif', ''], ['31', 'House Loops', '31.gif', ''], ['32', 'Pianissimo', '32.gif', ''], ['33', 'Yngvie Van Halen', '33.gif', ''], ['34', 'Rockin’ Riffs', '34.gif', ''], ['35', 'Supa Funk', '35.gif', ''], ['36', 'Bossa Nueva', '36.gif', ''], ['37', 'Habbowood', '37.gif', ''], ['38', 'Highway to Habbo', '38.gif', ''], ['39', 'Pixels on the Water', '39.gif', ''], ['40', 'Iron Maid', '40.gif', ''], ['41', 'Sympathy for the Coder', '41.gif', ''], ['42', 'Snouthill Horror', '42.gif', ''], ['43', 'Silence of the Moderators', '43.gif', ''], ['44', 'Ghost Story', '44.gif', ''], ['45', 'Berlin Connection', '45.gif', ''], ['46', 'Club Sounds III', '46.gif', ''], ['47', 'Loco Electro', '47.gif', ''], ['48', 'Jackin’ Chicago', '48.gif', ''], ['49', 'Maximum Minimal', '49.gif', ''], ['50', 'Nu Skool Breakz', '50.gif', ''], ['51', 'NYC Beat', '51.gif', ''], ['52', 'State of Trancehouse', '52.gif', ''], ['53', 'Jingle Beats', '53.gif', ''], ['54', 'Rudolph’s Loops', '54.gif', ''], ['55', 'RnB Grooves 1', '55.gif', ''], ['56', 'RnB Grooves 2', '56.gif', ''], ['57', 'RnB Grooves 3', '57.gif', ''], ['58', 'RnB Grooves 4', '58.gif', ''], ['59', 'RnB Grooves 5', '59.gif', ''], ['60', 'Valentine 1', '60.gif', ''], ['61', 'Valentine 2', '61.gif', ''], ['62', 'Alhambra Trax 1', '62.gif', ''], ['63', 'Alhambra Trax 2', '63.gif', ''], ['64', 'Alhambra Trax 3', '64.gif', ''], ['65', 'Tiki Vol. 1', '65.gif', ''], ['66', 'Tiki Vol. 2', '66.gif', ''], ['67', 'Tiki Vol. 3', '67.gif', ''], ['68', 'EC 1', '68.gif', ''], ['69', 'EC 2', '69.gif', ''], ['70', 'EC 3', '70.gif', ''], ['71', 'Icy Trax', '71.gif', ''], ['72', 'Country sounds', '72.gif', '']];
	// thing,thing,thing,collection,filename
	var songs = [null, ['1', '1', '1', '1', 'sound_machine_sample_1.mp3'], ['2', '2', '2', '1', 'sound_machine_sample_2.mp3'], ['3', '3', '2', '1', 'sound_machine_sample_3.mp3'], ['4', '4', '4', '1', 'sound_machine_sample_4.mp3'], ['5', '5', '2', '1', 'sound_machine_sample_5.mp3'], ['6', '6', '1', '1', 'sound_machine_sample_6.mp3'], ['7', '7', '2', '1', 'sound_machine_sample_7.mp3'], ['8', '8', '1', '1', 'sound_machine_sample_8.mp3'], ['9', '9', '2', '1', 'sound_machine_sample_9.mp3'], ['10', '1', '2', '2', 'sound_machine_sample_10.mp3'], ['11', '2', '2', '2', 'sound_machine_sample_11.mp3'], ['12', '3', '2', '2', 'sound_machine_sample_12.mp3'], ['13', '4', '2', '2', 'sound_machine_sample_13.mp3'], ['14', '5', '4', '2', 'sound_machine_sample_14.mp3'], ['15', '6', '1', '2', 'sound_machine_sample_15.mp3'], ['16', '7', '1', '2', 'sound_machine_sample_16.mp3'], ['17', '8', '1', '2', 'sound_machine_sample_17.mp3'], ['18', '9', '2', '2', 'sound_machine_sample_18.mp3'], ['19', '1', '2', '3', 'sound_machine_sample_19.mp3'], ['20', '2', '1', '3', 'sound_machine_sample_20.mp3'], ['21', '3', '1', '3', 'sound_machine_sample_21.mp3'], ['22', '4', '2', '3', 'sound_machine_sample_22.mp3'], ['23', '5', '4', '3', 'sound_machine_sample_23.mp3'], ['24', '6', '1', '3', 'sound_machine_sample_24.mp3'], ['25', '7', '1', '3', 'sound_machine_sample_25.mp3'], ['26', '8', '1', '3', 'sound_machine_sample_26.mp3'], ['27', '9', '2', '3', 'sound_machine_sample_27.mp3'], ['28', '1', '4', '4', 'sound_machine_sample_28.mp3'], ['29', '2', '2', '4', 'sound_machine_sample_29.mp3'], ['30', '3', '4', '4', 'sound_machine_sample_30.mp3'], ['31', '4', '2', '4', 'sound_machine_sample_31.mp3'], ['32', '5', '2', '4', 'sound_machine_sample_32.mp3'], ['33', '6', '1', '4', 'sound_machine_sample_33.mp3'], ['34', '7', '2', '4', 'sound_machine_sample_34.mp3'], ['35', '8', '2', '4', 'sound_machine_sample_35.mp3'], ['36', '9', '2', '4', 'sound_machine_sample_36.mp3'], ['37', '1', '4', '5', 'sound_machine_sample_37.mp3'], ['38', '2', '1', '5', 'sound_machine_sample_38.mp3'], ['39', '3', '2', '5', 'sound_machine_sample_39.mp3'], ['40', '4', '2', '5', 'sound_machine_sample_40.mp3'], ['41', '5', '1.5', '5', 'sound_machine_sample_41.mp3'], ['42', '6', '5.5', '5', 'sound_machine_sample_42.mp3'], ['43', '7', '1', '5', 'sound_machine_sample_43.mp3'], ['44', '8', '2', '5', 'sound_machine_sample_44.mp3'], ['45', '9', '1', '5', 'sound_machine_sample_45.mp3'], ['46', '1', '3', '6', 'sound_machine_sample_46.mp3'], ['47', '2', '4', '6', 'sound_machine_sample_47.mp3'], ['48', '3', '2', '6', 'sound_machine_sample_48.mp3'], ['49', '4', '4', '6', 'sound_machine_sample_49.mp3'], ['50', '5', '2', '6', 'sound_machine_sample_50.mp3'], ['51', '6', '4', '6', 'sound_machine_sample_51.mp3'], ['52', '7', '1', '6', 'sound_machine_sample_52.mp3'], ['53', '8', '2', '6', 'sound_machine_sample_53.mp3'], ['54', '9', '3', '6', 'sound_machine_sample_54.mp3'], ['55', '1', '1.5', '7', 'sound_machine_sample_55.mp3'], ['56', '2', '2', '7', 'sound_machine_sample_56.mp3'], ['57', '3', '1', '7', 'sound_machine_sample_57.mp3'], ['58', '4', '1', '7', 'sound_machine_sample_58.mp3'], ['59', '5', '1', '7', 'sound_machine_sample_59.mp3'], ['60', '6', '1', '7', 'sound_machine_sample_60.mp3'], ['61', '7', '2', '7', 'sound_machine_sample_61.mp3'], ['62', '8', '1', '7', 'sound_machine_sample_62.mp3'], ['63', '9', '2', '7', 'sound_machine_sample_63.mp3'], ['64', '1', '1', '8', 'sound_machine_sample_64.mp3'], ['65', '2', '2', '8', 'sound_machine_sample_65.mp3'], ['66', '3', '2', '8', 'sound_machine_sample_66.mp3'], ['67', '4', '4', '8', 'sound_machine_sample_67.mp3'], ['68', '5', '2', '8', 'sound_machine_sample_68.mp3'], ['69', '6', '1', '8', 'sound_machine_sample_69.mp3'], ['70', '7', '2', '8', 'sound_machine_sample_70.mp3'], ['71', '8', '2', '8', 'sound_machine_sample_71.mp3'], ['72', '9', '1', '8', 'sound_machine_sample_72.mp3'], ['73', '1', '2', '9', 'sound_machine_sample_73.mp3'], ['74', '2', '2', '9', 'sound_machine_sample_74.mp3'], ['75', '3', '3', '9', 'sound_machine_sample_75.mp3'], ['76', '4', '2', '9', 'sound_machine_sample_76.mp3'], ['77', '5', '4', '9', 'sound_machine_sample_77.mp3'], ['78', '6', '4', '9', 'sound_machine_sample_78.mp3'], ['79', '7', '2', '9', 'sound_machine_sample_79.mp3'], ['80', '8', '4', '9', 'sound_machine_sample_80.mp3'], ['81', '9', '3', '9', 'sound_machine_sample_81.mp3'], ['82', '1', '1', '10', 'sound_machine_sample_82.mp3'], ['83', '2', '2', '10', 'sound_machine_sample_83.mp3'], ['84', '3', '1', '10', 'sound_machine_sample_84.mp3'], ['85', '4', '1.5', '10', 'sound_machine_sample_85.mp3'], ['86', '5', '1', '10', 'sound_machine_sample_86.mp3'], ['87', '6', '4', '10', 'sound_machine_sample_87.mp3'], ['88', '7', '1', '10', 'sound_machine_sample_88.mp3'], ['89', '8', '2', '10', 'sound_machine_sample_89.mp3'], ['90', '9', '1', '10', 'sound_machine_sample_90.mp3'], ['91', '1', '2', '11', 'sound_machine_sample_91.mp3'], ['92', '2', '1', '11', 'sound_machine_sample_92.mp3'], ['93', '3', '4', '11', 'sound_machine_sample_93.mp3'], ['94', '4', '2', '11', 'sound_machine_sample_94.mp3'], ['95', '5', '2', '11', 'sound_machine_sample_95.mp3'], ['96', '6', '2', '11', 'sound_machine_sample_96.mp3'], ['97', '7', '2', '11', 'sound_machine_sample_97.mp3'], ['98', '8', '2', '11', 'sound_machine_sample_98.mp3'], ['99', '9', '2', '11', 'sound_machine_sample_99.mp3'], ['100', '1', '1', '12', 'sound_machine_sample_100.mp3'], ['101', '2', '1', '12', 'sound_machine_sample_101.mp3'], ['102', '3', '4', '12', 'sound_machine_sample_102.mp3'], ['103', '4', '1', '12', 'sound_machine_sample_103.mp3'], ['104', '5', '1', '12', 'sound_machine_sample_104.mp3'], ['105', '6', '1.5', '12', 'sound_machine_sample_105.mp3'], ['106', '7', '2', '12', 'sound_machine_sample_106.mp3'], ['107', '8', '10', '12', 'sound_machine_sample_107.mp3'], ['108', '9', '2', '12', 'sound_machine_sample_108.mp3'], ['109', '1', '1', '13', 'sound_machine_sample_109.mp3'], ['110', '2', '4', '13', 'sound_machine_sample_110.mp3'], ['111', '3', '1.5', '13', 'sound_machine_sample_111.mp3'], ['112', '4', '2', '13', 'sound_machine_sample_112.mp3'], ['113', '5', '2', '13', 'sound_machine_sample_113.mp3'], ['114', '6', '2', '13', 'sound_machine_sample_114.mp3'], ['115', '7', '4', '13', 'sound_machine_sample_115.mp3'], ['116', '8', '2', '13', 'sound_machine_sample_116.mp3'], ['117', '9', '5', '13', 'sound_machine_sample_117.mp3'], ['118', '1', '1', '14', 'sound_machine_sample_118.mp3'], ['119', '2', '4', '14', 'sound_machine_sample_119.mp3'], ['120', '3', '2', '14', 'sound_machine_sample_120.mp3'], ['121', '4', '2', '14', 'sound_machine_sample_121.mp3'], ['122', '5', '2', '14', 'sound_machine_sample_122.mp3'], ['123', '6', '2', '14', 'sound_machine_sample_123.mp3'], ['124', '7', '1', '14', 'sound_machine_sample_124.mp3'], ['125', '8', '1', '14', 'sound_machine_sample_125.mp3'], ['126', '9', '2', '14', 'sound_machine_sample_126.mp3'], ['127', '1', '4', '15', 'sound_machine_sample_127.mp3'], ['128', '2', '4', '15', 'sound_machine_sample_128.mp3'], ['129', '3', '2', '15', 'sound_machine_sample_129.mp3'], ['130', '4', '2', '15', 'sound_machine_sample_130.mp3'], ['131', '5', '1', '15', 'sound_machine_sample_131.mp3'], ['132', '6', '1.5', '15', 'sound_machine_sample_132.mp3'], ['133', '7', '1.5', '15', 'sound_machine_sample_133.mp3'], ['134', '8', '9', '15', 'sound_machine_sample_134.mp3'], ['135', '9', '8.5', '15', 'sound_machine_sample_135.mp3'], ['136', '1', '2', '16', 'sound_machine_sample_136.mp3'], ['137', '2', '2', '16', 'sound_machine_sample_137.mp3'], ['138', '3', '2', '16', 'sound_machine_sample_138.mp3'], ['139', '4', '2', '16', 'sound_machine_sample_139.mp3'], ['140', '5', '2', '16', 'sound_machine_sample_140.mp3'], ['141', '6', '2', '16', 'sound_machine_sample_141.mp3'], ['142', '7', '2', '16', 'sound_machine_sample_142.mp3'], ['143', '8', '4', '16', 'sound_machine_sample_143.mp3'], ['144', '9', '2', '16', 'sound_machine_sample_144.mp3'], ['145', '1', '4', '17', 'sound_machine_sample_145.mp3'], ['146', '2', '1', '17', 'sound_machine_sample_146.mp3'], ['147', '3', '1', '17', 'sound_machine_sample_147.mp3'], ['148', '4', '1.5', '17', 'sound_machine_sample_148.mp3'], ['149', '5', '1', '17', 'sound_machine_sample_149.mp3'], ['150', '6', '2', '17', 'sound_machine_sample_150.mp3'], ['151', '7', '2', '17', 'sound_machine_sample_151.mp3'], ['152', '8', '4', '17', 'sound_machine_sample_152.mp3'], ['153', '9', '4', '17', 'sound_machine_sample_153.mp3'], ['154', '1', '1', '18', 'sound_machine_sample_154.mp3'], ['155', '2', '2', '18', 'sound_machine_sample_155.mp3'], ['156', '3', '1.5', '18', 'sound_machine_sample_156.mp3'], ['157', '4', '1', '18', 'sound_machine_sample_157.mp3'], ['158', '5', '1', '18', 'sound_machine_sample_158.mp3'], ['159', '6', '1', '18', 'sound_machine_sample_159.mp3'], ['160', '7', '1', '18', 'sound_machine_sample_160.mp3'], ['161', '8', '1', '18', 'sound_machine_sample_161.mp3'], ['162', '9', '1', '18', 'sound_machine_sample_162.mp3'], ['163', '1', '2', '19', 'sound_machine_sample_163.mp3'], ['164', '2', '2', '19', 'sound_machine_sample_164.mp3'], ['165', '3', '2', '19', 'sound_machine_sample_165.mp3'], ['166', '4', '2', '19', 'sound_machine_sample_166.mp3'], ['167', '5', '1.5', '19', 'sound_machine_sample_167.mp3'], ['168', '6', '1.5', '19', 'sound_machine_sample_168.mp3'], ['169', '7', '2', '19', 'sound_machine_sample_169.mp3'], ['170', '8', '1', '19', 'sound_machine_sample_170.mp3'], ['171', '9', '1', '19', 'sound_machine_sample_171.mp3'], ['172', '1', '4', '20', 'sound_machine_sample_172.mp3'], ['173', '2', '4', '20', 'sound_machine_sample_173.mp3'], ['174', '3', '5.5', '20', 'sound_machine_sample_174.mp3'], ['175', '4', '1', '20', 'sound_machine_sample_175.mp3'], ['176', '5', '2', '20', 'sound_machine_sample_176.mp3'], ['177', '6', '2', '20', 'sound_machine_sample_177.mp3'], ['178', '7', '2', '20', 'sound_machine_sample_178.mp3'], ['179', '8', '2', '20', 'sound_machine_sample_179.mp3'], ['180', '9', '2', '20', 'sound_machine_sample_180.mp3'], ['181', '1', '4', '21', 'sound_machine_sample_181.mp3'], ['182', '2', '4', '21', 'sound_machine_sample_182.mp3'], ['183', '3', '4', '21', 'sound_machine_sample_183.mp3'], ['184', '4', '1', '21', 'sound_machine_sample_184.mp3'], ['185', '5', '1', '21', 'sound_machine_sample_185.mp3'], ['186', '6', '1', '21', 'sound_machine_sample_186.mp3'], ['187', '7', '1', '21', 'sound_machine_sample_187.mp3'], ['188', '8', '4', '21', 'sound_machine_sample_188.mp3'], ['189', '9', '4', '21', 'sound_machine_sample_189.mp3'], ['190', '1', '1.5', '22', 'sound_machine_sample_190.mp3'], ['191', '2', '1', '22', 'sound_machine_sample_191.mp3'], ['192', '3', '1.5', '22', 'sound_machine_sample_192.mp3'], ['193', '4', '2', '22', 'sound_machine_sample_193.mp3'], ['194', '5', '4', '22', 'sound_machine_sample_194.mp3'], ['195', '6', '2', '22', 'sound_machine_sample_195.mp3'], ['196', '7', '4', '22', 'sound_machine_sample_196.mp3'], ['197', '8', '4', '22', 'sound_machine_sample_197.mp3'], ['198', '9', '1', '22', 'sound_machine_sample_198.mp3'], ['199', '1', '3', '23', 'sound_machine_sample_199.mp3'], ['200', '2', '2', '23', 'sound_machine_sample_200.mp3'], ['201', '3', '1', '23', 'sound_machine_sample_201.mp3'], ['202', '4', '1', '23', 'sound_machine_sample_202.mp3'], ['203', '5', '2', '23', 'sound_machine_sample_203.mp3'], ['204', '6', '1', '23', 'sound_machine_sample_204.mp3'], ['205', '7', '2', '23', 'sound_machine_sample_205.mp3'], ['206', '8', '2', '23', 'sound_machine_sample_206.mp3'], ['207', '9', '3', '23', 'sound_machine_sample_207.mp3'], ['208', '1', '1', '24', 'sound_machine_sample_208.mp3'], ['209', '2', '2', '24', 'sound_machine_sample_209.mp3'], ['210', '3', '2', '24', 'sound_machine_sample_210.mp3'], ['211', '4', '5.5', '24', 'sound_machine_sample_211.mp3'], ['212', '5', '2', '24', 'sound_machine_sample_212.mp3'], ['213', '6', '2', '24', 'sound_machine_sample_213.mp3'], ['214', '7', '2', '24', 'sound_machine_sample_214.mp3'], ['215', '8', '1', '24', 'sound_machine_sample_215.mp3'], ['216', '9', '2', '24', 'sound_machine_sample_216.mp3'], ['217', '1', '1.5', '25', 'sound_machine_sample_217.mp3'], ['218', '2', '4', '25', 'sound_machine_sample_218.mp3'], ['219', '3', '4', '25', 'sound_machine_sample_219.mp3'], ['220', '4', '2', '25', 'sound_machine_sample_220.mp3'], ['221', '5', '4', '25', 'sound_machine_sample_221.mp3'], ['222', '6', '1', '25', 'sound_machine_sample_222.mp3'], ['223', '7', '1', '25', 'sound_machine_sample_223.mp3'], ['224', '8', '4', '25', 'sound_machine_sample_224.mp3'], ['225', '9', '4', '25', 'sound_machine_sample_225.mp3'], ['226', '1', '2', '26', 'sound_machine_sample_226.mp3'], ['227', '2', '2', '26', 'sound_machine_sample_227.mp3'], ['228', '3', '1', '26', 'sound_machine_sample_228.mp3'], ['229', '4', '4', '26', 'sound_machine_sample_229.mp3'], ['230', '5', '1', '26', 'sound_machine_sample_230.mp3'], ['231', '6', '1', '26', 'sound_machine_sample_231.mp3'], ['232', '7', '1', '26', 'sound_machine_sample_232.mp3'], ['233', '8', '1', '26', 'sound_machine_sample_233.mp3'], ['234', '9', '1', '26', 'sound_machine_sample_234.mp3'], ['235', '1', '2', '27', 'sound_machine_sample_235.mp3'], ['236', '2', '2', '27', 'sound_machine_sample_236.mp3'], ['237', '3', '2', '27', 'sound_machine_sample_237.mp3'], ['238', '4', '1', '27', 'sound_machine_sample_238.mp3'], ['239', '5', '1', '27', 'sound_machine_sample_239.mp3'], ['240', '6', '2', '27', 'sound_machine_sample_240.mp3'], ['241', '7', '2', '27', 'sound_machine_sample_241.mp3'], ['242', '8', '2', '27', 'sound_machine_sample_242.mp3'], ['243', '9', '2', '27', 'sound_machine_sample_243.mp3'], ['244', '1', '2', '28', 'sound_machine_sample_244.mp3'], ['245', '2', '4', '28', 'sound_machine_sample_245.mp3'], ['246', '3', '4', '28', 'sound_machine_sample_246.mp3'], ['247', '4', '4', '28', 'sound_machine_sample_247.mp3'], ['248', '5', '4', '28', 'sound_machine_sample_248.mp3'], ['249', '6', '2', '28', 'sound_machine_sample_249.mp3'], ['250', '7', '4', '28', 'sound_machine_sample_250.mp3'], ['251', '8', '4', '28', 'sound_machine_sample_251.mp3'], ['252', '9', '4', '28', 'sound_machine_sample_252.mp3'], ['253', '1', '1.5', '29', 'sound_machine_sample_253.mp3'], ['254', '2', '2', '29', 'sound_machine_sample_254.mp3'], ['255', '3', '2', '29', 'sound_machine_sample_255.mp3'], ['256', '4', '1.5', '29', 'sound_machine_sample_256.mp3'], ['257', '5', '1', '29', 'sound_machine_sample_257.mp3'], ['258', '6', '2', '29', 'sound_machine_sample_258.mp3'], ['259', '7', '2', '29', 'sound_machine_sample_259.mp3'], ['260', '8', '1', '29', 'sound_machine_sample_260.mp3'], ['261', '9', '2', '29', 'sound_machine_sample_261.mp3'], ['262', '1', '2', '30', 'sound_machine_sample_262.mp3'], ['263', '2', '4', '30', 'sound_machine_sample_263.mp3'], ['264', '3', '2', '30', 'sound_machine_sample_264.mp3'], ['265', '4', '4', '30', 'sound_machine_sample_265.mp3'], ['266', '5', '4', '30', 'sound_machine_sample_266.mp3'], ['267', '6', '4', '30', 'sound_machine_sample_267.mp3'], ['268', '7', '4', '30', 'sound_machine_sample_268.mp3'], ['269', '8', '4', '30', 'sound_machine_sample_269.mp3'], ['270', '9', '4', '30', 'sound_machine_sample_270.mp3'], ['271', '1', '5.5', '31', 'sound_machine_sample_271.mp3'], ['272', '2', '4', '31', 'sound_machine_sample_272.mp3'], ['273', '3', '1', '31', 'sound_machine_sample_273.mp3'], ['274', '4', '4', '31', 'sound_machine_sample_274.mp3'], ['275', '5', '4', '31', 'sound_machine_sample_275.mp3'], ['276', '6', '4', '31', 'sound_machine_sample_276.mp3'], ['277', '7', '1', '31', 'sound_machine_sample_277.mp3'], ['278', '8', '1', '31', 'sound_machine_sample_278.mp3'], ['279', '9', '1', '31', 'sound_machine_sample_279.mp3'], ['280', '1', '4', '32', 'sound_machine_sample_280.mp3'], ['281', '2', '4', '32', 'sound_machine_sample_281.mp3'], ['282', '3', '4', '32', 'sound_machine_sample_282.mp3'], ['283', '4', '4', '32', 'sound_machine_sample_283.mp3'], ['284', '5', '4', '32', 'sound_machine_sample_284.mp3'], ['285', '6', '4', '32', 'sound_machine_sample_285.mp3'], ['286', '7', '4', '32', 'sound_machine_sample_286.mp3'], ['287', '8', '4', '32', 'sound_machine_sample_287.mp3'], ['288', '9', '4', '32', 'sound_machine_sample_288.mp3'], ['289', '1', '2', '33', 'sound_machine_sample_289.mp3'], ['290', '2', '2', '33', 'sound_machine_sample_290.mp3'], ['291', '3', '2', '33', 'sound_machine_sample_291.mp3'], ['292', '4', '4', '33', 'sound_machine_sample_292.mp3'], ['293', '5', '2', '33', 'sound_machine_sample_293.mp3'], ['294', '6', '2', '33', 'sound_machine_sample_294.mp3'], ['295', '7', '2', '33', 'sound_machine_sample_295.mp3'], ['296', '8', '2', '33', 'sound_machine_sample_296.mp3'], ['297', '9', '2', '33', 'sound_machine_sample_297.mp3'], ['298', '1', '2', '34', 'sound_machine_sample_298.mp3'], ['299', '2', '2', '34', 'sound_machine_sample_299.mp3'], ['300', '3', '2', '34', 'sound_machine_sample_300.mp3'], ['301', '4', '2', '34', 'sound_machine_sample_301.mp3'], ['302', '5', '2', '34', 'sound_machine_sample_302.mp3'], ['303', '6', '2', '34', 'sound_machine_sample_303.mp3'], ['304', '7', '2', '34', 'sound_machine_sample_304.mp3'], ['305', '8', '2', '34', 'sound_machine_sample_305.mp3'], ['306', '9', '2', '34', 'sound_machine_sample_306.mp3'], ['307', '1', '1', '35', 'sound_machine_sample_307.mp3'], ['308', '2', '1', '35', 'sound_machine_sample_308.mp3'], ['309', '3', '1.5', '35', 'sound_machine_sample_309.mp3'], ['310', '4', '1', '35', 'sound_machine_sample_310.mp3'], ['311', '5', '1', '35', 'sound_machine_sample_311.mp3'], ['312', '6', '1.5', '35', 'sound_machine_sample_312.mp3'], ['313', '7', '1.5', '35', 'sound_machine_sample_313.mp3'], ['314', '8', '1', '35', 'sound_machine_sample_314.mp3'], ['315', '9', '1', '35', 'sound_machine_sample_315.mp3'], ['316', '1', '2', '36', 'sound_machine_sample_316.mp3'], ['317', '2', '2', '36', 'sound_machine_sample_317.mp3'], ['318', '3', '2', '36', 'sound_machine_sample_318.mp3'], ['319', '4', '2', '36', 'sound_machine_sample_319.mp3'], ['320', '5', '1.5', '36', 'sound_machine_sample_320.mp3'], ['321', '6', '2', '36', 'sound_machine_sample_321.mp3'], ['322', '7', '2', '36', 'sound_machine_sample_322.mp3'], ['323', '8', '2', '36', 'sound_machine_sample_323.mp3'], ['324', '9', '2', '36', 'sound_machine_sample_324.mp3'], ['325', '1', '8', '37', 'sound_machine_sample_325.mp3'], ['326', '2', '8', '37', 'sound_machine_sample_326.mp3'], ['327', '3', '4', '37', 'sound_machine_sample_327.mp3'], ['328', '4', '2', '37', 'sound_machine_sample_328.mp3'], ['329', '5', '2', '37', 'sound_machine_sample_329.mp3'], ['330', '6', '2', '37', 'sound_machine_sample_330.mp3'], ['331', '7', '2', '37', 'sound_machine_sample_331.mp3'], ['332', '8', '2', '37', 'sound_machine_sample_332.mp3'], ['333', '9', '2', '37', 'sound_machine_sample_333.mp3'], ['334', '1', '2', '38', 'sound_machine_sample_334.mp3'], ['335', '2', '2', '38', 'sound_machine_sample_335.mp3'], ['336', '3', '1', '38', 'sound_machine_sample_336.mp3'], ['337', '4', '2', '38', 'sound_machine_sample_337.mp3'], ['338', '5', '4', '38', 'sound_machine_sample_338.mp3'], ['339', '6', '1', '38', 'sound_machine_sample_339.mp3'], ['340', '7', '2', '38', 'sound_machine_sample_340.mp3'], ['341', '8', '2', '38', 'sound_machine_sample_341.mp3'], ['342', '9', '4', '38', 'sound_machine_sample_342.mp3'], ['343', '1', '4', '39', 'sound_machine_sample_343.mp3'], ['344', '2', '2', '39', 'sound_machine_sample_344.mp3'], ['345', '3', '2', '39', 'sound_machine_sample_345.mp3'], ['346', '4', '1', '39', 'sound_machine_sample_346.mp3'], ['347', '5', '1', '39', 'sound_machine_sample_347.mp3'], ['348', '6', '1', '39', 'sound_machine_sample_348.mp3'], ['349', '7', '2', '39', 'sound_machine_sample_349.mp3'], ['350', '8', '2', '39', 'sound_machine_sample_350.mp3'], ['351', '9', '2', '39', 'sound_machine_sample_351.mp3'], ['352', '1', '2', '40', 'sound_machine_sample_352.mp3'], ['353', '2', '1', '40', 'sound_machine_sample_353.mp3'], ['354', '3', '4', '40', 'sound_machine_sample_354.mp3'], ['355', '4', '2', '40', 'sound_machine_sample_355.mp3'], ['356', '5', '2', '40', 'sound_machine_sample_356.mp3'], ['357', '6', '1', '40', 'sound_machine_sample_357.mp3'], ['358', '7', '4', '40', 'sound_machine_sample_358.mp3'], ['359', '8', '2', '40', 'sound_machine_sample_359.mp3'], ['360', '9', '1', '40', 'sound_machine_sample_360.mp3'], ['361', '1', '1', '41', 'sound_machine_sample_361.mp3'], ['362', '2', '2', '41', 'sound_machine_sample_362.mp3'], ['363', '3', '2', '41', 'sound_machine_sample_363.mp3'], ['364', '4', '2', '41', 'sound_machine_sample_364.mp3'], ['365', '5', '2', '41', 'sound_machine_sample_365.mp3'], ['366', '6', '1.5', '41', 'sound_machine_sample_366.mp3'], ['367', '7', '4', '41', 'sound_machine_sample_367.mp3'], ['368', '8', '2', '41', 'sound_machine_sample_368.mp3'], ['369', '9', '4', '41', 'sound_machine_sample_369.mp3'], ['370', '1', '3', '42', 'sound_machine_sample_370.mp3'], ['371', '2', '4', '42', 'sound_machine_sample_371.mp3'], ['372', '3', '4', '42', 'sound_machine_sample_372.mp3'], ['373', '4', '4', '42', 'sound_machine_sample_373.mp3'], ['374', '5', '4', '42', 'sound_machine_sample_374.mp3'], ['375', '6', '3', '42', 'sound_machine_sample_375.mp3'], ['376', '7', '4', '42', 'sound_machine_sample_376.mp3'], ['377', '8', '1.5', '42', 'sound_machine_sample_377.mp3'], ['378', '9', '4', '42', 'sound_machine_sample_378.mp3'], ['379', '1', '4', '43', 'sound_machine_sample_379.mp3'], ['380', '2', '4', '43', 'sound_machine_sample_380.mp3'], ['381', '3', '4', '43', 'sound_machine_sample_381.mp3'], ['382', '4', '4', '43', 'sound_machine_sample_382.mp3'], ['383', '5', '3', '43', 'sound_machine_sample_383.mp3'], ['384', '6', '3', '43', 'sound_machine_sample_384.mp3'], ['385', '7', '2', '43', 'sound_machine_sample_385.mp3'], ['386', '8', '2', '43', 'sound_machine_sample_386.mp3'], ['387', '9', '4', '43', 'sound_machine_sample_387.mp3'], ['388', '1', '5', '44', 'sound_machine_sample_388.mp3'], ['389', '2', '4', '44', 'sound_machine_sample_389.mp3'], ['390', '3', '4', '44', 'sound_machine_sample_390.mp3'], ['391', '4', '4', '44', 'sound_machine_sample_391.mp3'], ['392', '5', '2', '44', 'sound_machine_sample_392.mp3'], ['393', '6', '2', '44', 'sound_machine_sample_393.mp3'], ['394', '7', '4', '44', 'sound_machine_sample_394.mp3'], ['395', '8', '2', '44', 'sound_machine_sample_395.mp3'], ['396', '9', '4', '44', 'sound_machine_sample_396.mp3'], ['397', '1', '2', '45', 'sound_machine_sample_397.mp3'], ['398', '2', '1', '45', 'sound_machine_sample_398.mp3'], ['399', '3', '2', '45', 'sound_machine_sample_399.mp3'], ['400', '4', '2', '45', 'sound_machine_sample_400.mp3'], ['401', '5', '2', '45', 'sound_machine_sample_401.mp3'], ['402', '6', '2', '45', 'sound_machine_sample_402.mp3'], ['403', '7', '2', '45', 'sound_machine_sample_403.mp3'], ['404', '8', '2', '45', 'sound_machine_sample_404.mp3'], ['405', '9', '4', '45', 'sound_machine_sample_405.mp3'], ['406', '1', '2', '46', 'sound_machine_sample_406.mp3'], ['407', '2', '1.5', '46', 'sound_machine_sample_407.mp3'], ['408', '3', '1', '46', 'sound_machine_sample_408.mp3'], ['409', '4', '2', '46', 'sound_machine_sample_409.mp3'], ['410', '5', '2', '46', 'sound_machine_sample_410.mp3'], ['411', '6', '2', '46', 'sound_machine_sample_411.mp3'], ['412', '7', '2', '46', 'sound_machine_sample_412.mp3'], ['413', '8', '2', '46', 'sound_machine_sample_413.mp3'], ['414', '9', '4', '46', 'sound_machine_sample_414.mp3'], ['415', '1', '2', '47', 'sound_machine_sample_415.mp3'], ['416', '2', '2', '47', 'sound_machine_sample_416.mp3'], ['417', '3', '2', '47', 'sound_machine_sample_417.mp3'], ['418', '4', '2', '47', 'sound_machine_sample_418.mp3'], ['419', '5', '1', '47', 'sound_machine_sample_419.mp3'], ['420', '6', '2', '47', 'sound_machine_sample_420.mp3'], ['421', '7', '2', '47', 'sound_machine_sample_421.mp3'], ['422', '8', '2', '47', 'sound_machine_sample_422.mp3'], ['423', '9', '2', '47', 'sound_machine_sample_423.mp3'], ['424', '1', '1', '48', 'sound_machine_sample_424.mp3'], ['425', '2', '2', '48', 'sound_machine_sample_425.mp3'], ['426', '3', '2', '48', 'sound_machine_sample_426.mp3'], ['427', '4', '2', '48', 'sound_machine_sample_427.mp3'], ['428', '5', '1', '48', 'sound_machine_sample_428.mp3'], ['429', '6', '2', '48', 'sound_machine_sample_429.mp3'], ['430', '7', '2', '48', 'sound_machine_sample_430.mp3'], ['431', '8', '4', '48', 'sound_machine_sample_431.mp3'], ['432', '9', '1', '48', 'sound_machine_sample_432.mp3'], ['433', '1', '2', '49', 'sound_machine_sample_433.mp3'], ['434', '2', '2', '49', 'sound_machine_sample_434.mp3'], ['435', '3', '2', '49', 'sound_machine_sample_435.mp3'], ['436', '4', '2', '49', 'sound_machine_sample_436.mp3'], ['437', '5', '2', '49', 'sound_machine_sample_437.mp3'], ['438', '6', '2', '49', 'sound_machine_sample_438.mp3'], ['439', '7', '4', '49', 'sound_machine_sample_439.mp3'], ['440', '8', '4', '49', 'sound_machine_sample_440.mp3'], ['441', '9', '2', '49', 'sound_machine_sample_441.mp3'], ['442', '1', '1', '50', 'sound_machine_sample_442.mp3'], ['443', '2', '2', '50', 'sound_machine_sample_443.mp3'], ['444', '3', '1', '50', 'sound_machine_sample_444.mp3'], ['445', '4', '1', '50', 'sound_machine_sample_445.mp3'], ['446', '5', '1', '50', 'sound_machine_sample_446.mp3'], ['447', '6', '2', '50', 'sound_machine_sample_447.mp3'], ['448', '7', '1.5', '50', 'sound_machine_sample_448.mp3'], ['449', '8', '2', '50', 'sound_machine_sample_449.mp3'], ['450', '9', '2', '50', 'sound_machine_sample_450.mp3'], ['451', '1', '2', '51', 'sound_machine_sample_451.mp3'], ['452', '2', '4', '51', 'sound_machine_sample_452.mp3'], ['453', '3', '4', '51', 'sound_machine_sample_453.mp3'], ['454', '4', '2', '51', 'sound_machine_sample_454.mp3'], ['455', '5', '2', '51', 'sound_machine_sample_455.mp3'], ['456', '6', '2', '51', 'sound_machine_sample_456.mp3'], ['457', '7', '2', '51', 'sound_machine_sample_457.mp3'], ['458', '8', '2', '51', 'sound_machine_sample_458.mp3'], ['459', '9', '1', '51', 'sound_machine_sample_459.mp3'], ['460', '1', '2', '52', 'sound_machine_sample_460.mp3'], ['461', '2', '2', '52', 'sound_machine_sample_461.mp3'], ['462', '3', '2', '52', 'sound_machine_sample_462.mp3'], ['463', '4', '2', '52', 'sound_machine_sample_463.mp3'], ['464', '5', '1', '52', 'sound_machine_sample_464.mp3'], ['465', '6', '2', '52', 'sound_machine_sample_465.mp3'], ['466', '7', '2', '52', 'sound_machine_sample_466.mp3'], ['467', '8', '2', '52', 'sound_machine_sample_467.mp3'], ['468', '9', '2', '52', 'sound_machine_sample_468.mp3'], ['469', '1', '2', '53', 'sound_machine_sample_469.mp3'], ['470', '2', '4', '53', 'sound_machine_sample_470.mp3'], ['471', '3', '4', '53', 'sound_machine_sample_471.mp3'], ['472', '4', '2', '53', 'sound_machine_sample_472.mp3'], ['473', '5', '4', '53', 'sound_machine_sample_473.mp3'], ['474', '6', '4', '53', 'sound_machine_sample_474.mp3'], ['475', '7', '4', '53', 'sound_machine_sample_475.mp3'], ['476', '8', '4', '53', 'sound_machine_sample_476.mp3'], ['477', '9', '2', '53', 'sound_machine_sample_477.mp3'], ['478', '1', '4', '54', 'sound_machine_sample_478.mp3'], ['479', '2', '2', '54', 'sound_machine_sample_479.mp3'], ['480', '3', '4', '54', 'sound_machine_sample_480.mp3'], ['481', '4', '4', '54', 'sound_machine_sample_481.mp3'], ['482', '5', '4', '54', 'sound_machine_sample_482.mp3'], ['483', '6', '2', '54', 'sound_machine_sample_483.mp3'], ['484', '7', '4', '54', 'sound_machine_sample_484.mp3'], ['485', '8', '4', '54', 'sound_machine_sample_485.mp3'], ['486', '9', '2', '54', 'sound_machine_sample_486.mp3'], ['487', '1', '2', '55', 'sound_machine_sample_487.mp3'], ['488', '2', '2', '55', 'sound_machine_sample_488.mp3'], ['489', '3', '2', '55', 'sound_machine_sample_489.mp3'], ['490', '4', '3', '55', 'sound_machine_sample_490.mp3'], ['491', '5', '2', '55', 'sound_machine_sample_491.mp3'], ['492', '6', '2', '55', 'sound_machine_sample_492.mp3'], ['493', '7', '4', '55', 'sound_machine_sample_493.mp3'], ['494', '8', '2', '55', 'sound_machine_sample_494.mp3'], ['495', '9', '2', '55', 'sound_machine_sample_495.mp3'], ['496', '1', '2', '56', 'sound_machine_sample_496.mp3'], ['497', '2', '4', '56', 'sound_machine_sample_497.mp3'], ['498', '3', '2', '56', 'sound_machine_sample_498.mp3'], ['499', '4', '4', '56', 'sound_machine_sample_499.mp3'], ['500', '5', '4', '56', 'sound_machine_sample_500.mp3'], ['501', '6', '2', '56', 'sound_machine_sample_501.mp3'], ['502', '7', '4', '56', 'sound_machine_sample_502.mp3'], ['503', '8', '2', '56', 'sound_machine_sample_503.mp3'], ['504', '9', '1', '56', 'sound_machine_sample_504.mp3'], ['505', '1', '4', '57', 'sound_machine_sample_505.mp3'], ['506', '2', '4', '57', 'sound_machine_sample_506.mp3'], ['507', '3', '2', '57', 'sound_machine_sample_507.mp3'], ['508', '4', '4', '57', 'sound_machine_sample_508.mp3'], ['509', '5', '2', '57', 'sound_machine_sample_509.mp3'], ['510', '6', '3', '57', 'sound_machine_sample_510.mp3'], ['511', '7', '2', '57', 'sound_machine_sample_511.mp3'], ['512', '8', '2', '57', 'sound_machine_sample_512.mp3'], ['513', '9', '1.5', '57', 'sound_machine_sample_513.mp3'], ['514', '1', '3', '58', 'sound_machine_sample_514.mp3'], ['515', '2', '4', '58', 'sound_machine_sample_515.mp3'], ['516', '3', '4', '58', 'sound_machine_sample_516.mp3'], ['517', '4', '2', '58', 'sound_machine_sample_517.mp3'], ['518', '5', '1', '58', 'sound_machine_sample_518.mp3'], ['519', '6', '2', '58', 'sound_machine_sample_519.mp3'], ['520', '7', '4', '58', 'sound_machine_sample_520.mp3'], ['521', '8', '2', '58', 'sound_machine_sample_521.mp3'], ['522', '9', '2', '58', 'sound_machine_sample_522.mp3'], ['523', '1', '2', '59', 'sound_machine_sample_523.mp3'], ['524', '2', '2', '59', 'sound_machine_sample_524.mp3'], ['525', '3', '2', '59', 'sound_machine_sample_525.mp3'], ['526', '4', '2', '59', 'sound_machine_sample_526.mp3'], ['527', '5', '2', '59', 'sound_machine_sample_527.mp3'], ['528', '6', '2', '59', 'sound_machine_sample_528.mp3'], ['529', '7', '1', '59', 'sound_machine_sample_529.mp3'], ['530', '8', '2', '59', 'sound_machine_sample_530.mp3'], ['531', '9', '2', '59', 'sound_machine_sample_531.mp3'], ['532', '1', '1.5', '60', 'sound_machine_sample_532.mp3'], ['533', '2', '2', '60', 'sound_machine_sample_533.mp3'], ['534', '3', '2', '60', 'sound_machine_sample_534.mp3'], ['535', '4', '1', '60', 'sound_machine_sample_535.mp3'], ['536', '5', '1', '60', 'sound_machine_sample_536.mp3'], ['537', '6', '2', '60', 'sound_machine_sample_537.mp3'], ['538', '7', '2', '60', 'sound_machine_sample_538.mp3'], ['539', '8', '1', '60', 'sound_machine_sample_539.mp3'], ['540', '9', '2', '60', 'sound_machine_sample_540.mp3'], ['541', '1', '1', '61', 'sound_machine_sample_541.mp3'], ['542', '2', '2', '61', 'sound_machine_sample_542.mp3'], ['543', '3', '2', '61', 'sound_machine_sample_543.mp3'], ['544', '4', '2', '61', 'sound_machine_sample_544.mp3'], ['545', '5', '2', '61', 'sound_machine_sample_545.mp3'], ['546', '6', '4', '61', 'sound_machine_sample_546.mp3'], ['547', '7', '2', '61', 'sound_machine_sample_547.mp3'], ['548', '8', '2', '61', 'sound_machine_sample_548.mp3'], ['549', '9', '2', '61', 'sound_machine_sample_549.mp3'], ['550', '1', '4', '62', 'sound_machine_sample_550.mp3'], ['551', '2', '4', '62', 'sound_machine_sample_551.mp3'], ['552', '3', '4', '62', 'sound_machine_sample_552.mp3'], ['553', '4', '4', '62', 'sound_machine_sample_553.mp3'], ['554', '5', '4', '62', 'sound_machine_sample_554.mp3'], ['555', '6', '2', '62', 'sound_machine_sample_555.mp3'], ['556', '7', '2', '62', 'sound_machine_sample_556.mp3'], ['557', '8', '2', '62', 'sound_machine_sample_557.mp3'], ['558', '9', '4', '62', 'sound_machine_sample_558.mp3'], ['559', '1', '4', '63', 'sound_machine_sample_559.mp3'], ['560', '2', '4', '63', 'sound_machine_sample_560.mp3'], ['561', '3', '4', '63', 'sound_machine_sample_561.mp3'], ['562', '4', '4', '63', 'sound_machine_sample_562.mp3'], ['563', '5', '4', '63', 'sound_machine_sample_563.mp3'], ['564', '6', '4', '63', 'sound_machine_sample_564.mp3'], ['565', '7', '2', '63', 'sound_machine_sample_565.mp3'], ['566', '8', '2', '63', 'sound_machine_sample_566.mp3'], ['567', '9', '2', '63', 'sound_machine_sample_567.mp3'], ['568', '1', '2', '64', 'sound_machine_sample_568.mp3'], ['569', '2', '2', '64', 'sound_machine_sample_569.mp3'], ['570', '3', '4', '64', 'sound_machine_sample_570.mp3'], ['571', '4', '1', '64', 'sound_machine_sample_571.mp3'], ['572', '5', '3', '64', 'sound_machine_sample_572.mp3'], ['573', '6', '2', '64', 'sound_machine_sample_573.mp3'], ['574', '7', '4', '64', 'sound_machine_sample_574.mp3'], ['575', '8', '4', '64', 'sound_machine_sample_575.mp3'], ['576', '9', '4', '64', 'sound_machine_sample_576.mp3'], ['577', '1', '4', '65', 'sound_machine_sample_577.mp3'], ['578', '2', '4', '65', 'sound_machine_sample_578.mp3'], ['579', '3', '4', '65', 'sound_machine_sample_579.mp3'], ['580', '4', '4', '65', 'sound_machine_sample_580.mp3'], ['581', '5', '4', '65', 'sound_machine_sample_581.mp3'], ['582', '6', '4', '65', 'sound_machine_sample_582.mp3'], ['583', '7', '4', '65', 'sound_machine_sample_583.mp3'], ['584', '8', '4', '65', 'sound_machine_sample_584.mp3'], ['585', '9', '5', '65', 'sound_machine_sample_585.mp3'], ['586', '1', '4', '66', 'sound_machine_sample_586.mp3'], ['587', '2', '4', '66', 'sound_machine_sample_587.mp3'], ['588', '3', '4', '66', 'sound_machine_sample_588.mp3'], ['589', '4', '4', '66', 'sound_machine_sample_589.mp3'], ['590', '5', '4', '66', 'sound_machine_sample_590.mp3'], ['591', '6', '3', '66', 'sound_machine_sample_591.mp3'], ['592', '7', '4', '66', 'sound_machine_sample_592.mp3'], ['593', '8', '4', '66', 'sound_machine_sample_593.mp3'], ['594', '9', '5', '66', 'sound_machine_sample_594.mp3'], ['595', '1', '4', '67', 'sound_machine_sample_595.mp3'], ['596', '2', '4', '67', 'sound_machine_sample_596.mp3'], ['597', '3', '4', '67', 'sound_machine_sample_597.mp3'], ['598', '4', '4', '67', 'sound_machine_sample_598.mp3'], ['599', '5', '3', '67', 'sound_machine_sample_599.mp3'], ['600', '6', '3', '67', 'sound_machine_sample_600.mp3'], ['601', '7', '4', '67', 'sound_machine_sample_601.mp3'], ['602', '8', '4', '67', 'sound_machine_sample_602.mp3'], ['603', '9', '4', '67', 'sound_machine_sample_603.mp3'], ['604', '1', '2', '68', 'sound_machine_sample_604.mp3'], ['605', '2', '2', '68', 'sound_machine_sample_605.mp3'], ['606', '3', '1', '68', 'sound_machine_sample_606.mp3'], ['607', '4', '4', '68', 'sound_machine_sample_607.mp3'], ['608', '5', '4', '68', 'sound_machine_sample_608.mp3'], ['609', '6', '1', '68', 'sound_machine_sample_609.mp3'], ['610', '7', '2', '68', 'sound_machine_sample_610.mp3'], ['611', '8', '4', '68', 'sound_machine_sample_611.mp3'], ['612', '9', '4', '68', 'sound_machine_sample_612.mp3'], ['613', '1', '4', '69', 'sound_machine_sample_613.mp3'], ['614', '2', '2', '69', 'sound_machine_sample_614.mp3'], ['615', '3', '1', '69', 'sound_machine_sample_615.mp3'], ['616', '4', '2', '69', 'sound_machine_sample_616.mp3'], ['617', '5', '4', '69', 'sound_machine_sample_617.mp3'], ['618', '6', '2', '69', 'sound_machine_sample_618.mp3'], ['619', '7', '2', '69', 'sound_machine_sample_619.mp3'], ['620', '8', '1', '69', 'sound_machine_sample_620.mp3'], ['621', '9', '2', '69', 'sound_machine_sample_621.mp3'], ['622', '1', '4', '70', 'sound_machine_sample_622.mp3'], ['623', '2', '2', '70', 'sound_machine_sample_623.mp3'], ['624', '3', '2', '70', 'sound_machine_sample_624.mp3'], ['625', '4', '2', '70', 'sound_machine_sample_625.mp3'], ['626', '5', '2', '70', 'sound_machine_sample_626.mp3'], ['627', '6', '2', '70', 'sound_machine_sample_627.mp3'], ['628', '7', '2', '70', 'sound_machine_sample_628.mp3'], ['629', '8', '4', '70', 'sound_machine_sample_629.mp3'], ['630', '9', '4', '70', 'sound_machine_sample_630.mp3'], ['631', '1', '4', '71', 'sound_machine_sample_631.mp3'], ['632', '2', '4', '71', 'sound_machine_sample_632.mp3'], ['633', '3', '4', '71', 'sound_machine_sample_633.mp3'], ['634', '4', '4', '71', 'sound_machine_sample_634.mp3'], ['635', '5', '4', '71', 'sound_machine_sample_635.mp3'], ['636', '6', '4', '71', 'sound_machine_sample_636.mp3'], ['637', '7', '4', '71', 'sound_machine_sample_637.mp3'], ['638', '8', '4', '71', 'sound_machine_sample_638.mp3'], ['639', '9', '4', '71', 'sound_machine_sample_639.mp3'], ['640', '1', '4', '72', 'sound_machine_sample_640.mp3'], ['641', '2', '4', '72', 'sound_machine_sample_641.mp3'], ['642', '3', '4', '72', 'sound_machine_sample_642.mp3'], ['643', '4', '4', '72', 'sound_machine_sample_643.mp3'], ['644', '5', '4', '72', 'sound_machine_sample_644.mp3'], ['645', '6', '4', '72', 'sound_machine_sample_645.mp3'], ['646', '7', '4', '72', 'sound_machine_sample_646.mp3'], ['647', '8', '1', '72', 'sound_machine_sample_647.mp3'], ['648', '9', '1', '72', 'sound_machine_sample_648.mp3']];


	function theSongIdOnList(songCollection, songClass) {
		for (var x in songs) {
			if (songs[x] && songs[x][1] == songClass && songs[x][3] == songCollection)
				return songs[x][0];
		}
	}
	function theSongIdOnPiker(songPikerIndex, songClass) {
		var piker = document.getElementById("palhetas").childNodes[songPikerIndex - 1];
		return theSongIdOnList(piker.getAttribute("trax-cartuchoIndex"), songClass);
	}

	var cartuchos = document.createElement("div");
	cartuchos.setAttribute("id", "cartuchos");

	var cartuchosList = document.createElement("div");
	cartuchosList.setAttribute("id", "cartuchos-list");
	var aDiv = document.createElement("div");
	for (var i = 1; i < collections.length; i++) {
		var cartucho = document.createElement("div");
		cartucho.setAttribute("class", "cartucho");

		var img = document.createElement("img");
		img.src = "../imgs/"+collections[i][2];
		img.setAttribute("onclick", "setCartucho("+i+")");
		cartucho.appendChild(img);

		var cartuchoName = document.createElement("span");
		cartuchoName.appendChild(document.createTextNode(collections[i][1]));
		cartucho.appendChild(cartuchoName);

		aDiv.appendChild(cartucho);
	}
	cartuchosList.appendChild(aDiv);
	cartuchos.appendChild(cartuchosList);

	var cartuchosPager = document.createElement("div");
	cartuchosPager.setAttribute("id", "cartuchos-pager");
	var cartuchosPagerLeft = document.createElement("input");
	cartuchosPagerLeft.setAttribute("id", "cartuchos-pager-left");
	cartuchosPagerLeft.setAttribute("type", "button");
	cartuchosPagerLeft.setAttribute("onclick", "moveCartuchosList('left')");
	cartuchosPager.appendChild(cartuchosPagerLeft);
	var cartuchosPagerCount = document.createElement("div");
	var cartuchosPagerCountNow = document.createElement("span");
	cartuchosPagerCountNow.setAttribute("id", "cartuchos-pager-counter-now");
	cartuchosPagerCount.appendChild(cartuchosPagerCountNow);
	cartuchosPagerCount.appendChild(document.createTextNode("/"));
	var cartuchosPagerCountMax = document.createElement("span");
	cartuchosPagerCountMax.setAttribute("id", "cartuchos-pager-counter-max");
	cartuchosPagerCount.appendChild(cartuchosPagerCountMax);
	cartuchosPager.appendChild(cartuchosPagerCount);
	var cartuchosPagerRight = document.createElement("input");
	cartuchosPagerRight.setAttribute("id", "cartuchos-pager-right");
	cartuchosPagerRight.setAttribute("type", "button");
	cartuchosPagerRight.setAttribute("onclick", "moveCartuchosList('right')");
	cartuchosPager.appendChild(cartuchosPagerRight);

	cartuchos.appendChild(cartuchosPager);
	traxmachine.appendChild(cartuchos);
	var countNow = 1;
	function moveCartuchosList(direction) {
		if (direction == "left") {
			direction = 1;
		} else if(direction == "right") {
			direction = -1;
		} else {
			direction = 0;
		}

		if (direction) {
			countNow -= direction;
			var obj = document.getElementById("cartuchos-list").firstChild.firstChild;
			while (obj) {
				obj.style.transform = "translateY("+((countNow - 1) * -111)+"px)";
				obj = obj.nextElementSibling;
			}
		}

		var i = 0;
		var obj = document.getElementById("cartuchos-list").firstChild.firstChild;
		while (obj) {
			if (obj.style.display != "none") {
				i++;
			}
			obj = obj.nextElementSibling;
		}
		var countMax = Math.ceil(i / 3);
		document.getElementById("cartuchos-pager-counter-max").innerHTML = countMax;

		if (countNow > countMax)
			moveCartuchosList("left");

		document.getElementById("cartuchos-pager-counter-now").innerHTML = countNow;

		var obj = document.getElementById("cartuchos-pager-left");
		countNow <= 1 ? obj.disabled = true : obj.disabled = false;
		var obj = document.getElementById("cartuchos-pager-right");
		countNow >= countMax ? obj.disabled = true : obj.disabled = false;
	}
	moveCartuchosList(null);

	function getPalheta() {
		var palheta = document.createElement("div");
		palheta.setAttribute("class", "palheta");

		var header = document.createElement("div");
		header.setAttribute("trax-moduleColor", (document.getElementById("palhetas").childNodes.length + 1));
		palheta.appendChild(header);

		var piker = document.createElement("ul");
		piker.setAttribute("class", "piker");
		palheta.appendChild(piker);

		document.getElementById("palhetas").appendChild(palheta);
	}
	var palhetas = document.createElement("div");
	palhetas.setAttribute("id", "palhetas");
	document.getElementById("traxmachine").appendChild(palhetas);
	for (var i = 0; i < 4; i++)
		getPalheta();

	var audioLoader = [];
	function setCartucho(cartuchoIndex) {
		var obj = document.getElementById("palhetas").firstChild;
		var j = 0;
		while (obj && obj.firstChild.hasChildNodes()) {
			obj = obj.nextElementSibling;
			j++
		}
		if (obj && !obj.firstChild.hasChildNodes()) {
			document.getElementById("cartuchos-list").firstChild.childNodes[cartuchoIndex-1].style.display = "none";
			moveCartuchosList(null);
			var palheta = obj;
			palheta.setAttribute("trax-cartuchoIndex", cartuchoIndex);

			var header = palheta.firstChild;
			header.classList.add("header");
			header.setAttribute("onclick", "removeCartucho("+cartuchoIndex+", "+j+")");
			var title = document.createElement("span");
			var titleText = document.createTextNode(collections[cartuchoIndex][1]);
			title.appendChild(titleText);
			header.innerHTML = "";
			header.appendChild(title);

			var piker = palheta.lastChild;
			piker.innerHTML = "";
			for (var i = 0; i < 9; i++) {
				var child = document.createElement("li");
				child.classList.add("module");
				child.setAttribute("trax-moduleColor", (j+1));
				child.setAttribute("trax-moduleClass", i+1);
				// child.setAttribute("trax-songId", theSongIdOnList(cartuchoIndex, i+1));
				child.setAttribute("id", "song"+theSongIdOnList(cartuchoIndex, i+1));

				audioLoader[theSongIdOnList(cartuchoIndex, i+1)] = document.createElement("audio");
				audioLoader[theSongIdOnList(cartuchoIndex, i+1)].src = "../sounds/" + songs[theSongIdOnList(cartuchoIndex, i+1)][4];
				child.setAttribute("trax-loadingFile", "");
				audioLoader[theSongIdOnList(cartuchoIndex, i+1)].setAttribute("loop", true);
				audioLoader[theSongIdOnList(cartuchoIndex, i+1)].myParam = (j+1)+", "+(i+1);
				audioLoader[theSongIdOnList(cartuchoIndex, i+1)].addEventListener("canplay", enableSong);
				child.myParam = (j+1)+", "+(i+1);
				child.addEventListener("mouseover", previewSong);
				child.addEventListener("mouseout", stopPreview);
				piker.appendChild(child);
			}
			console.log("Cartucho inserido!");
		} else {
			console.log("Não há espaço para mais cartuchos.");
		}
	}

	var everRemove = false;
	function removeCartucho(cartuchoIndex, pikerIndex) {
		if (!everRemove)
			var resposta = confirm("Ejetar cartucho?\nTem certeza de que deseja remover o cartucho e suas amostras a partir da música?");
		else
			resposta = true;
		if (resposta) {
			var cartuchoInList = cartuchosList.firstChild.childNodes[cartuchoIndex-1];
			cartuchoInList.style.display = "inherit";
			var cartuchoInPiker = palhetas.childNodes[pikerIndex];
			cartuchoInPiker.removeAttribute("trax-cartuchoindex");
			cartuchoInPiker.firstChild.innerHTML = "";
			cartuchoInPiker.firstChild.removeAttribute("class");
			cartuchoInPiker.firstChild.removeAttribute("onclick");
			cartuchoInPiker.lastChild.innerHTML = "";
			console.log("Cartridge "+collections[cartuchoIndex][1]+" removed.");

			var clearLayers = document.querySelectorAll(".layer");
			for (var i = 0; i < clearLayers.length; i++) {
				var obj = clearLayers[i].firstChild.firstChild.firstChild;
				while (obj) {
					console.log(pikerIndex);
					if (obj.hasChildNodes() && obj.firstChild.getAttribute("trax-moduleColor") == pikerIndex+1)
						obj.removeChild(obj.firstChild);
					obj = obj.nextElementSibling;
				}
			}
			console.log("Cartridge Sounds "+collections[cartuchoIndex][1]+" removed from the timeline.");
			checkNeedMore();

			if (!everRemove)
				if (confirm("Do you want to remember this decision?"))
					everRemove = true;
		}
	}

	function enableSong(evt) {
		var cartuchoIndex = evt.target.myParam.split(", ")[0];
		var moduleClass = evt.target.myParam.split(", ")[1];
		var songId = theSongIdOnPiker(cartuchoIndex, moduleClass);
		setTimeout(function() {
			var obj = document.getElementById("song"+songId);
			obj.setAttribute("draggable", true);
			obj.addEventListener("dragstart", function(){
				event.dataTransfer.setData("text", ((indexOf(this.parentElement.parentElement) + 1)+", "+(indexOf(this) + 1)));
				event.dataTransfer.setDragImage(img, 0, 0);
				timeline.setAttribute("theDataTransfer", (indexOf(this.parentElement.parentElement) + 1)+", "+(indexOf(this) + 1));
				// console.log((indexOf(this.parentElement.parentElement) + 1)+", "+(indexOf(this) + 1));
			});
			obj.removeAttribute("trax-loadingFile");
			obj.removeAttribute("id");
			audioLoader[songId].removeEventListener("canplay", enableSong);
			console.log(songs[songId][4]+" ready!");
		}, 1);
	}
	var songPlaying = null;
	function previewSong(evt) {
		if (!musicPlaying) {
			if (songPlaying) audioLoader[songPlaying].pause();
			var cartuchoIndex = evt.target.myParam.split(", ")[0];
			var moduleClass = evt.target.myParam.split(", ")[1];
			var songId = theSongIdOnPiker(cartuchoIndex, moduleClass);
			audioLoader[songId].currentTime = 0;
			audioLoader[songId].play();
			songPlaying = songId;
			console.log("Preview do som "+songs[songId][4]);
		}
	}
	function stopPreview() {
		if (songPlaying) audioLoader[songPlaying].pause();
	}

	var player = document.createElement("div");
	player.setAttribute("id", "player");

	var mouseContinuous = [];
	var controls = document.createElement("div");
	controls.setAttribute("id", "controls");
	var buttonPlayPause = document.createElement("input");
	buttonPlayPause.setAttribute("type", "button");
	buttonPlayPause.setAttribute("id", "playPause");
	buttonPlayPause.setAttribute("onclick", "play()");
	buttonPlayPause.disabled = true;
	controls.appendChild(buttonPlayPause);
	var buttonStop = document.createElement("input");
	buttonStop.setAttribute("type", "button");
	buttonStop.setAttribute("id", "stop");
	buttonStop.setAttribute("onclick", "stop()");
	buttonStop.disabled = true;
	controls.appendChild(buttonStop);
	var buttonSave = document.createElement("input");
	buttonSave.setAttribute("type", "button");
	buttonSave.setAttribute("id", "save");
	buttonSave.setAttribute("onclick", "save()");
	buttonSave.disabled = true;
	buttonSave.style.display = "none";
	controls.appendChild(buttonSave);
	var buttonOpen = document.createElement("input");
	buttonOpen.setAttribute("type", "button");
	buttonOpen.setAttribute("id", "open");
	buttonOpen.setAttribute("onclick", "openMusic()");
	buttonOpen.style.display = "none";
	controls.appendChild(buttonOpen);
	var buttonClear = document.createElement("input");
	buttonClear.setAttribute("type", "button");
	buttonClear.setAttribute("id", "clear");
	buttonClear.setAttribute("onclick", "clearSongs()");
	buttonClear.disabled = true;
	controls.appendChild(buttonClear);
	var buttonMvTlLeft = document.createElement("input");
	buttonMvTlLeft.setAttribute("type", "button");
	buttonMvTlLeft.setAttribute("id", "moveLeft");
	buttonMvTlLeft.setAttribute("onclick", "moveTimeline('left')");
	buttonMvTlLeft.addEventListener("mousedown", function() {
		clearInterval(mouseContinuous[0]);
		clearInterval(mouseContinuous[1]);
		mouseContinuous[0] = setTimeout(function() {
			mouseContinuous[1] =  setInterval(function() {
				document.getElementById("moveLeft").click();
			// moveTimeline("right");
			}, 70);
		}, 500);
	});
	buttonMvTlLeft.addEventListener("mouseup", function() {
		clearInterval(mouseContinuous[0]);
		clearInterval(mouseContinuous[1]);
	});
	controls.appendChild(buttonMvTlLeft);
	var buttonMvTlRight = document.createElement("input");
	buttonMvTlRight.setAttribute("type", "button");
	buttonMvTlRight.setAttribute("id", "moveRight");
	buttonMvTlRight.setAttribute("onclick", "moveTimeline('right')");
	buttonMvTlRight.addEventListener("mousedown", function() {
		clearInterval(mouseContinuous[0]);
		clearInterval(mouseContinuous[1]);
		mouseContinuous[0] = setTimeout(function() {
			mouseContinuous[1] = setInterval(function() {
				document.getElementById("moveRight").click();
			// moveTimeline("right");
			}, 100);
		}, 500);
	});
	buttonMvTlRight.addEventListener("mouseup", function() {
		clearInterval(mouseContinuous[0]);
		clearInterval(mouseContinuous[1]);
	});
	controls.appendChild(buttonMvTlRight);

	player.appendChild(controls);

	var timeline = document.createElement("div");
	timeline.setAttribute("id", "timeline");
	for (var i = 0; i < 4; i++) {
		var layer = document.createElement("div");
		layer.setAttribute("class", "layer");
		var subLayer = document.createElement("div");
		var subSubLayer = document.createElement("div");
		for (var j = 0; j < 24; j++) {
			subSubLayer.appendChild(newSpace());
		}
		subLayer.appendChild(subSubLayer)
		layer.appendChild(subLayer);
		timeline.appendChild(layer);
	}
	var agulhaRange = document.createElement("input");
	agulhaRange.setAttribute("type", "range");
	agulhaRange.setAttribute("id", "agulha");
	agulhaRange.setAttribute("min", 0);
	agulhaRange.setAttribute("max", 23);
	agulhaRange.setAttribute("value", 0);
	agulhaRange.addEventListener("change", function(){
		agulha = document.getElementById("agulha").value - Number(origem);
		console.log("Agulha e AgulhaRange movidas (mouse)! "+agulha+" e "+document.getElementById("agulha").value);
		agulha == 0 ? stop() : pause();
	});
	timeline.appendChild(agulhaRange);
	player.appendChild(timeline);

	document.getElementById("traxmachine").appendChild(player);

	function newSpace() {
		var space = document. createElement("div");
		space.setAttribute("class", "space");
		addListener(space, "dragover", function(){
			event.preventDefault();
		}, false);
		space.setAttribute("ondragenter", "canDragOver(this)");
		space.addEventListener("dragleave", clearDragging);
		space.addEventListener("drop", function(){
			event.preventDefault;
			var cartuchoIndex = event.dataTransfer.getData("text").split(", ")[0];
			var moduleClass = event.dataTransfer.getData("text").split(", ")[1];
			// console.log(event.dataTransfer.getData("text"));
			dropSong(this, cartuchoIndex, moduleClass);

		});
		return space;
	}
	function dropSong(location, cartuchoIndex, moduleClass) {
		var songId = theSongIdOnPiker(cartuchoIndex, moduleClass);
		var length = songs[songId][2];
		clearDragging();
		var passou = true;
		var nextObj = location.nextElementSibling;
		for (var k = 1; k < length; k++) {
			if (nextObj.hasChildNodes())
				passou = false;
			nextObj = nextObj.nextElementSibling;
		}
		if (passou) {
			nextObj = location;
			for (var k = 0; k < length; k++) {
				removeAllListeners(nextObj, "dragover");
				var module = document.createElement("div");
				module.classList.add("module");
				module.setAttribute("trax-moduleColor", cartuchoIndex);
				if (length == 1)
					module.setAttribute("trax-moduleType", "unique");
				else if (k == 0)
					module.setAttribute("trax-moduleType", "start");
				else if (k == length - 1)
					module.setAttribute("trax-moduleType", "end");
				else
					module.setAttribute("trax-moduleType", "middle");
				if (k == 0)
					module.setAttribute("trax-playSong", songId);
				module.setAttribute("trax-moduleClass", songs[songId][1]);
				// module.setAttribute("trax-collectionBgColor", cartuchos[songId][4]);
				module.addEventListener("click", function(){
					if (!musicPlaying) {
						var objToCheck = location.firstChild;
						while (objToCheck.getAttribute("trax-moduleType") != "unique" && objToCheck.getAttribute("trax-moduleType") != "start")
							objToCheck = objToCheck.parentElement.previousElementSibling.firstChild;
						var objToRemo = objToCheck;
						var i = 0;
						do {
							var target = objToRemo;
							objToRemo = objToRemo.parentElement.nextElementSibling.firstChild;
							addListener(target.parentElement, "dragover", function(){
								event.preventDefault();
							}, false);
							target.parentElement.removeChild(target);
							checkEmpty();
							i++;
						} while (objToRemo && (objToRemo.getAttribute("trax-moduleType") != "unique" && objToRemo.getAttribute("trax-moduleType") != "start"));
						console.log("Um módulo de "+i+" espaço(s) foi removido.");
						checkNeedMore();
					}
				});
				if (!nextObj.hasChildNodes())
				nextObj.appendChild(module);
				nextObj = nextObj.nextElementSibling;
			}
			console.log("Foi adicionado um módulo de "+length+" espaços.");
			checkNeedMore();
			checkEmpty();
		}
	}
	function clearDragging() {
		var clearLayers = document.querySelectorAll(".layer");
		for (var i = 0; i < clearLayers.length; i++) {
			var clearObj = clearLayers[i].firstChild.firstChild.firstChild;
			while (clearObj) {
				clearObj.classList.remove("module");
				clearObj.removeAttribute("trax-moduleColor");
				clearObj.removeAttribute("trax-moduleClass");
				clearObj.removeAttribute("trax-moduleType");
				clearObj = clearObj.nextElementSibling;
			}
		}
	}
	function canDragOver(obj) {
		var t0 = performance.now();
		clearDragging();
		var t1 = performance.now();
		var waitCleaning = setTimeout(function () {
			clearInterval(waitCleaning);
			var cartuchoIndex = timeline.getAttribute("theDataTransfer").split(", ")[0];
			var moduleClass = timeline.getAttribute("theDataTransfer").split(", ")[1];
			var songId = theSongIdOnPiker(cartuchoIndex, moduleClass);
			var passou = true;
			var nextObj = obj;
			var length = songs[songId][2];
			for (var k = 0; k < length; k++) {
				if (!nextObj || nextObj.hasChildNodes())
					passou = false;
				if (passou)
					nextObj = nextObj.nextElementSibling;
			}
			if (passou) {
				nextObj = obj;
				for (var k = 0; k < length; k++) {
					nextObj.classList.add("module");
					nextObj.setAttribute("trax-moduleColor", cartuchoIndex);
					nextObj.setAttribute("trax-moduleClass", songs[songId][1]);
					if (length == 1)
						nextObj.setAttribute("trax-moduleType", "unique");
					else if (k == 0)
						nextObj.setAttribute("trax-moduleType", "start");
					else if (k == length - 1)
						nextObj.setAttribute("trax-moduleType", "end");
					else
						nextObj.setAttribute("trax-moduleType", "middle");
					nextObj = nextObj.nextElementSibling;
				}
			}
		}, t1 - t0);
	}

	var origem = 0;
	var timer;
	var agulha = 0;
	console.log("Agulha movida! "+agulha);
	var players = [];
	var firstPlay = true;
	var musicPlaying = false;
	function play() {
		musicPlaying = true;
		context.resume();
		document.getElementById("stop").disabled = false;
		document.getElementById("save").disabled = true;
		document.getElementById("clear").disabled = true;
		console.log("Solta o som DJJ!!!!");
		document.getElementById("playPause").setAttribute("onclick", "pause()");
		document.getElementById("agulha").value = Number(agulha) + Number(origem);
		console.log("AgulhaRange movida! "+(Number(agulha) + Number(origem)));
		firstPlay = true;
		//pause();
		clearInterval(timer);
		timer = setInterval(function() {ler()}, 2000);
		ler();
	}
	function ler() {
		if (!firstPlay) {
			agulha++;
			console.log("Agulha movida! "+agulha);
		}
		var songId;
		for (i = 0, n = 0, no = 0; i < 4; i++) {
			var theSpace = document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[agulha];
			if (theSpace.hasChildNodes()) {
				var achou = false;
				var secondsLeft;
				var theModule = theSpace.firstChild;
				if (theModule.getAttribute("trax-moduletype") == "start" || theModule.getAttribute("trax-moduletype") == "unique") {
					songId = theModule.getAttribute("trax-playSong");
					achou = true;
					secondsLeft = 0;
					console.log("2.1: É o primeiro módulo: "+i+" / "+agulha);
				} else if (firstPlay) {
					secondsLeft = 2;
					var objNoFirst = theSpace.previousElementSibling;
					 do {
						if (objNoFirst.firstChild.getAttribute("trax-moduletype") == "start" || objNoFirst.firstChild.getAttribute("trax-moduletype") == "unique") {
							achou = true;
							songId = objNoFirst.firstChild.getAttribute("trax-playSong");
						} else {
							secondsLeft += 2;
							objNoFirst = objNoFirst.previousElementSibling;
						}
					 } while (!achou || secondsLeft > 10);
					console.log("2.2: Não é o primeiro módulo, mas execute: "+i+" / "+agulha);
				} else {
					console.log("2.1: Já está executando: "+i+" / "+agulha);
				}
				if (achou) {
					loadAudioElement("../sounds/"+songs[songId][4], i).then(function(value) {
						/* Instantiate the Sound class into our hoisted variable. */
						var elem = value[0];
						var a = value[1];
						players[a] = Object.create(Sound);
							/* Set the element of `audio` to our MediaElement. */
						players[a].element = elem;
						/* Immediately play the file. */
						players[a].element.currentTime = secondsLeft;
						players[a].loop = false;
						players[a].setAudioStream();
						players[a].play();
					}, function(elem) {
							/* Let's throw an the error from the MediaElement if it fails. */
							throw elem.error;
					});
				}
				if (players[i] && secondsLeft)
					players[i].play();
			} else {
				console.log("1: Não tem modulo: "+i+" / "+agulha);
				no++;
			}
		}

		if (no == 4)
			checkEnd();
		if ((!document.getElementById("moveRight").disabled && Number(agulha) + Number(origem) < 11) || document.getElementById("moveRight").disabled) {
			document.getElementById("agulha").value = Number(agulha) + Number(origem);
			console.log("AgulhaRange movida! "+(Number(agulha) + Number(origem)));
		} else if (!firstPlay) {
			document.getElementById("moveRight").click();
			// moveTimeline("right");
			console.log("Timeline deslocada! "+(Number(agulha) + Number(origem)));
		}
		firstPlay = false;
	}
	function pause() {
		checkEmpty();
		document.getElementById("playPause").setAttribute("onclick", "play()");
		clearInterval(timer);
		for (i = 0; i < players.length; i++)
			if (players[i] && players[i].element) {
				players[i].pause();
				// players[i].element.currentTime = 0;
			}
		musicPlaying = false;
	}
	var silence;
	function stop() {
		document.getElementById("stop").disabled = true;
		pause();
		musicPlaying = true;
		running=true;
		agulha = 0;
		console.log("Agulha movida! "+agulha);
		origem = 0;
		for (var i = 0; i < 4; i++) {
			document.getElementById("timeline").childNodes[i].firstChild.firstChild.style.left = "0";
		}
		moveTimeline(null);
		document.getElementById("agulha").value = agulha;
	}
	function checkEnd() {
		var encontrou = false;
		var checkPosition = agulha;
		do {
			for (var i = 0; i < 4; i++) {
				if (document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[checkPosition].hasChildNodes()) {
					encontrou = true;
					return false;
				}
			}
			checkPosition++;
		} while (checkPosition < document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length);
		if (!encontrou) {
			console.log("Chegou ao fim. :(");
			document.getElementById("stop").click();
			// stop();
			return true;
		}
	}
	function moveTimeline(direction) {
		if (direction == "left") {
			direction = 1;
		} else if(direction == "right") {
			direction = -1;
		} else {
			direction = 0;
			// origem = document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length;
		}

		if ((origem == 0 && direction == -1) || (origem < 0 && direction == 1) || (Math.abs(origem) == document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length - 24 && direction == 1) || (Math.abs(origem) < document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length - 24 && direction == -1)) {
			origem += direction;
			if (Number(agulha) + Number(origem) == -1) {
				agulha++;
				console.log("Agulha movida (aqui)! "+agulha);
			} else if (Number(agulha) + Number(origem) == 24) {
				agulha--;
				console.log("Agulha movida (acolá)! "+agulha);
			}
			document.getElementById("agulha").value = Number(agulha) + Number(origem);
			console.log("AgulhaRange movida (kkk)! "+(Number(agulha) + Number(origem)));

			for (var i = 0; i < 4; i++) {
				document.getElementById("timeline").childNodes[i].firstChild.firstChild.style.left = (origem * 22)+"px";
			}
		} else {
			clearInterval(mouseContinuous[0]);
			clearInterval(mouseContinuous[1]);
		}

		var checkLeft = document.getElementById("moveLeft");
		origem >= 0 ? checkLeft.disabled = true : checkLeft.disabled = false;
		var checkRight = document.getElementById("moveRight");
		Math.abs(origem) >= document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length - 24 ? checkRight.disabled = true : checkRight.disabled = false;
	}
	moveTimeline(null);

	function checkNeedMore() {
		var cont = 0;
		var tem = 0;
		for (var i = 0; i < document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length; i++) {
			tem = 1;
			for (var j = 0; j < 4; j++) {
				if (document.getElementById("timeline").childNodes[j].firstChild.firstChild.childNodes[i].hasChildNodes()) {
					tem++;
				}
			}
			tem--;
			if (!tem) {
				cont++;
			} else {
				cont = 0;
			}
		}
		console.log("Total de espaços: "+i+" / Total sobrando: "+cont);
		if (cont < 12) {
			console.log("Precisa de mais "+(12 - cont)+"?");
			needMore(12 - cont);
		} else if (i > 24 && cont != i && cont > 12) {
			removeSpaces(cont - 12);
		} else if (cont == i && cont > 24) {
			removeSpaces(cont - 24);
		}
	}
	function needMore(qtd) {
		for (var i = 0; i < qtd; i++)
			for (var j = 0; j < 4; j++)
				document.getElementById("timeline").childNodes[j].firstChild.firstChild.appendChild(newSpace());
		moveTimeline(null);
		console.log("Adicionados mais "+qtd+" espaço(s)! Total: "+document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length);
	}
	function removeSpaces(qtd) {
		for (var i = 0; i < qtd; i++) {
			for (var j = 0; j < 4; j++)
				document.getElementById("timeline").childNodes[j].firstChild.firstChild.removeChild(document.getElementById("timeline").childNodes[j].firstChild.firstChild.lastChild);
			checkEmpty();
			moveTimeline(null);
			if (document.getElementById("moveRight").disabled)
				document.getElementById("moveLeft").click();
		}
		console.log(qtd+" espaços removido(s)! Total: "+document.getElementById("timeline").childNodes[0].firstChild.firstChild.childNodes.length);
	}

	var everClear = false;
	function clearSongs() {
		if (!everClear)
			var resposta = confirm("Descartar música? Tem certeza de que deseja descartar esta música?");
		else
			resposta = true;

		if (resposta) {
			document.getElementById("stop").click();
			console.log("Tudo foi descartado!");
			for (var i = 0; i < 4; i++) {
				var j = 0;
				while (j < document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes.length) {
					console.log(document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[j].hasChildNodes());
					if (document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[j].hasChildNodes()) {
						addListener(document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[j], "dragover", function(){
							event.preventDefault();
						}, false);
						document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[j].removeChild(document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[j].firstChild);
					}
					j++;
				}
			}
			checkEmpty();
			document.querySelector("div#controls input#save").disabled = true;
			document.querySelector("div#controls input#clear").disabled = true;

			if (!everClear)
				if (confirm("Deseja lembrar esta decisão?"))
					everClear = true;
		} else {
			console.log("Nada foi descartado.");
		}
	}
	function checkEmpty() {
		var cont = 0;
		for (var i = 0; i < 4; i++)
			for (var j = 0; j < document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes.length; j++)
				if (document.getElementById("timeline").childNodes[i].firstChild.firstChild.childNodes[j].hasChildNodes())
					cont++
		if (cont) {
			document.getElementById("playPause").disabled = false;
			// document.getElementById("stop").disabled = false;
			document.getElementById("save").disabled = false;
			document.getElementById("clear").disabled = false;
		} else {
			document.getElementById("playPause").disabled = true;
			document.getElementById("stop").disabled = true;
			document.getElementById("save").disabled = true;
			document.getElementById("clear").disabled = true;
		}
	}
	function indexOf(obj) {
		var i = 0;
		var objPai = obj.parentElement;
		while (obj != objPai.firstChild) {
			i++;
			obj = obj.previousElementSibling;
		}
		return i;
	}
	function save() {
		var musicName = prompt("Título da música");
		if (musicName) {
			var myCollections = [];
			var palhetas = document.querySelectorAll(".palheta");
			for (var x = 0; x < palhetas.length; x++) {
				myCollections[x] = palhetas[x].getAttribute("trax-cartuchoIndex");
			}
			if (!myCollections.length)
				delete myCollections;
			var mySongs = [];
			var layers = document.querySelectorAll(".layer");
			for (var x = 0; x < layers.length; x++) {
				mySongs[x] = [];
				var spaces = layers[x].firstChild.firstChild.childNodes;
				for (var y = 0; y < spaces.length; y++) {
					if (spaces[y] && spaces[y].hasChildNodes() && (spaces[y].firstChild.getAttribute("trax-moduleType") == "start" || spaces[y].firstChild.getAttribute("trax-moduleType") == "unique")) {
						mySongs[x][y] = [];
						mySongs[x][y][0] = spaces[y].firstChild.getAttribute("trax-moduleColor") - 1;
						mySongs[x][y][1] = spaces[y].firstChild.getAttribute("trax-moduleClass");
					}
				}
				if (!mySongs[x].length)
					delete mySongs[x];
			}
			if (!mySongs.length)
				delete mySongs;

			if (myCollections && mySongs) {

				var myMusic = {
					name: musicName,
					collections: myCollections,
					songs: mySongs
				};
				window.open("?"+serialize(myMusic, ""), '_blank');
				// document.getElementById("demo").innerHTML = DumpObjectIndented(myMusic, 0);
				// document.getElementsByTagName("body")[0].innerHTML = mySongs[3];
			}
		}
	}
	function openMusic() {
		var name = "";
		while (name == "") {
			name = prompt("Qual o nome da música?")
		}
		window.open("?name="+name, '_self');
	}
	function loadMusic() {
		var dados = musicInformation;
		// console.log(dados);
		var collections = dados.match(/\(COLLECTION ([^\)]?)+\)/g)
		for (i in collections) {
			var info = collections[i].replace(/\(COLLECTION /g, "").replace(/\)/g, "");
			// console.log(info);
			// collections[i] = [];
			collections[i] = info.replace(/[^\d,]/g, "").split(",");
			// collections[i][0] = info.replace(/(([\s\S]+)?cI: ([^\d]?))/g, "").replace(/(,[\s\S]+)/g, "");
			// collections[i][1] = info.replace(/(([\s\S]+)?cId: ([^\d]?))/g, "").replace(/(,[\s\S]+)/g, "");
			setCartucho(collections[i][1]);
		}
		var songs = dados.match(/\(SONG ([^\)]?)+\)/g)
		for (i in songs) {
			var info = songs[i].replace(/\(SONG /g, "").replace(/\)/g, "");
			// console.log(info);
			// songs[i] = [];
			songs[i] = info.replace(/[^\d,]/g, "").split(",");
			// songs[i]['agulha'] = info.replace(/(([\s\S]+)?x: ([^\d]?))/g, "").replace(/(,[\s\S]+)/g, "");
			// songs[i]['layer'] = info.replace(/(([\s\S]+)?i: ([^\d]?))/g, "").replace(/(,[\s\S]+)/g, "");
			// songs[i]['piker'] = info.replace(/(([\s\S]+)?c: ([^\d]?))/g, "").replace(/(,[\s\S]+)/g, "");
			// songs[i]['class'] = info.replace(/(([\s\S]+)?cI: ([^\d]?))/g, "").replace(/(,[\s\S]+)/g, "");
			console.log(document.querySelectorAll(".layer")[songs[i][1]]);
			dropSong(document.querySelectorAll(".layer")[songs[i][1]].firstChild.firstChild.childNodes[songs[i][0]], Number(songs[i][2])+1, songs[i][3]);
		}
		// document.getElementById("demo").innerHTML = songs.toString();
	}
