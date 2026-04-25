{\rtf1\ansi\ansicpg932\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red183\green111\blue247;\red23\green24\blue24;\red202\green202\blue202;
\red54\green192\blue160;\red212\green212\blue212;\red113\green192\blue131;\red109\green115\blue120;\red246\green124\blue48;
\red238\green46\blue56;}
{\*\expandedcolortbl;;\cssrgb\c77255\c54118\c97647;\cssrgb\c11765\c12157\c12549;\cssrgb\c83137\c83137\c83137;
\cssrgb\c23922\c78824\c69020;\cssrgb\c86275\c86275\c86275;\cssrgb\c50588\c78824\c58431;\cssrgb\c50196\c52549\c54510;\cssrgb\c98039\c56471\c24314;
\cssrgb\c95686\c27843\c27843;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  \cf5 \strokec5 React\cf6 \strokec6 ,\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4  useState\cf6 \strokec6 ,\cf4 \strokec4  useEffect\cf6 \strokec6 ,\cf4 \strokec4  useCallback\cf6 \strokec6 ,\cf4 \strokec4  useRef \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 from\cf4 \strokec4  \cf7 \strokec7 'react'\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // BGM/Audio\uc0\u12398 \u33258 \u21205 \u20877 \u29983 \u12456 \u12521 \u12540 \u12434 \u23433 \u20840 \u12395 \u22238 \u36991 \u12377 \u12427 \u12383 \u12417 \u12398 \u12458 \u12540 \u12496 \u12540 \u12521 \u12452 \u12489 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  originalAudioPlay \cf6 \strokec6 =\cf4 \strokec4  window\cf6 \strokec6 .\cf5 \strokec5 HTMLAudioElement\cf6 \strokec6 .\cf4 \strokec4 prototype\cf6 \strokec6 .\cf4 \strokec4 play\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 window\cf6 \strokec6 .\cf5 \strokec5 HTMLAudioElement\cf6 \strokec6 .\cf4 \strokec4 prototype\cf6 \strokec6 .\cf4 \strokec4 play \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 function\cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  promise \cf6 \strokec6 =\cf4 \strokec4  originalAudioPlay\cf6 \strokec6 .\cf4 \strokec4 apply\cf6 \strokec6 (\cf2 \strokec2 this\cf6 \strokec6 ,\cf4 \strokec4  arguments\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 promise \cf6 \strokec6 !==\cf4 \strokec4  \cf2 \strokec2 undefined\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 return\cf4 \strokec4  promise\cf6 \strokec6 .\cf2 \strokec2 catch\cf6 \strokec6 ((\cf4 \strokec4 e\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       console\cf6 \strokec6 .\cf4 \strokec4 warn\cf6 \strokec6 (\cf7 \strokec7 "Audio autoplay blocked, waiting for user interaction."\cf6 \strokec6 ,\cf4 \strokec4  e\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 return\cf4 \strokec4  \cf5 \strokec5 Promise\cf6 \strokec6 .\cf4 \strokec4 resolve\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \});\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 return\cf4 \strokec4  \cf5 \strokec5 Promise\cf6 \strokec6 .\cf4 \strokec4 resolve\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // --- \uc0\u12497 \u12531 \u12398 \u21336 \u35486 \u12487 \u12540 \u12479  ---\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 BREAD_WORDS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u39135 \u12497 \u12531 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12375 \u12423 \u12367 \u12401 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'shokupan'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57182 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12513 \u12525 \u12531 \u12497 \u12531 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12417 \u12429 \u12435 \u12401 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'meronpan'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57160 \u55356 \u57182 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12463 \u12525 \u12527 \u12483 \u12469 \u12531 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12367 \u12429 \u12431 \u12387 \u12373 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'kurowassan'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u56656 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12501 \u12521 \u12531 \u12473 \u12497 \u12531 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12405 \u12425 \u12435 \u12377 \u12401 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'furansupan'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u56662 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12354 \u12435 \u12401 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12354 \u12435 \u12401 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'anpan'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u57048 \u55356 \u57182 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12459 \u12524 \u12540 \u12497 \u12531 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12363 \u12428 \u12540 \u12401 \u12435 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'kare-pan'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57179 \u55356 \u57182 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12469 \u12531 \u12489 \u12452 \u12483 \u12481 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12373 \u12435 \u12393 \u12356 \u12387 \u12385 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'sandoitchi'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u56682 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12505 \u12540 \u12464 \u12523 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12409 \u12540 \u12368 \u12427 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'be-guru'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u56687 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12507 \u12483 \u12488 \u12489 \u12483 \u12464 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12411 \u12387 \u12392 \u12393 \u12387 \u12368 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'hottodoggu'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57133 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12495 \u12531 \u12496 \u12540 \u12460 \u12540 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12399 \u12435 \u12400 \u12540 \u12364 \u12540 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'hanba-ga-'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57172 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12481 \u12519 \u12467 \u12467 \u12525 \u12493 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12385 \u12423 \u12371 \u12371 \u12429 \u12397 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'chokokorone'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57195 \u55358 \u56656 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12497 \u12531 \u12465 \u12540 \u12461 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12401 \u12435 \u12369 \u12540 \u12365 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'panke-ki'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u56670 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // \uc0\u36861 \u21152 \u12373 \u12428 \u12427 \u12503 \u12524 \u12511 \u12450 \u12512 \u12497 \u12531 \u65288 \u12471 \u12519 \u12483 \u12503 \u12391 \u36092 \u20837 \u24460 \u20986 \u29694 \u65289 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 PREMIUM_BREADS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12463 \u12525 \u12483 \u12463 \u12512 \u12483 \u12471 \u12517 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12367 \u12429 \u12387 \u12367 \u12416 \u12387 \u12375 \u12421 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'kurokkumusshu'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55358 \u56682 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12471 \u12490 \u12514 \u12531 \u12525 \u12540 \u12523 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12375 \u12394 \u12418 \u12435 \u12429 \u12540 \u12427 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'shinamonro-ru'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57189 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 7.0\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12501 \u12523 \u12540 \u12484 \u12469 \u12531 \u12489 '\cf6 \strokec6 ,\cf4 \strokec4  kana\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12405 \u12427 \u12540 \u12388 \u12373 \u12435 \u12393 '\cf6 \strokec6 ,\cf4 \strokec4  romaji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'furu-tsusando'\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57171 \u55358 \u56682 '\cf6 \strokec6 ,\cf4 \strokec4  time\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 6.5\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 COURSES\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   easy\cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'easy'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12362 \u25163 \u36605 '\cf6 \strokec6 ,\cf4 \strokec4  speed\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1.5\cf6 \strokec6 ,\cf4 \strokec4  color\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   normal\cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'normal'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12405 \u12388 \u12358 '\cf6 \strokec6 ,\cf4 \strokec4  speed\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1.0\cf6 \strokec6 ,\cf4 \strokec4  color\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-500 hover:bg-orange-400 border-orange-600'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   hard\cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'hard'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u28608 \u12512 \u12474 '\cf6 \strokec6 ,\cf4 \strokec4  speed\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 0.7\cf6 \strokec6 ,\cf4 \strokec4  color\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-rose-500 hover:bg-rose-400 border-rose-600'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12398 \u12450 \u12452 \u12486 \u12512 \u12487 \u12540 \u12479 \u65288 \u20415 \u21033 \u12450 \u12452 \u12486 \u12512 \u65289 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 SHOP_ITEMS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'premium_bread'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u39640 \u32026 \u12497 \u12531 \u12524 \u12471 \u12500 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u26032 \u31278 \u12398 \u12497 \u12531 \u65288 \u12463 \u12525 \u12483 \u12463 \u12512 \u12483 \u12471 \u12517 \u31561 \u65289 \u12364 \u27969 \u12428 \u12390 \u12367 \u12427 \u65281 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55357 \u56534 '\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'golden_timer'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u37329 \u12398 \u12479 \u12452 \u12510 \u12540 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u21046 \u38480 \u26178 \u38291 \u12364  60\u31186  \u8594  75\u31186  \u12395 \u12450 \u12483 \u12503 \u65281 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 2000\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u9203 '\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'panda_apron'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u29305 \u35069 \u12456 \u12503 \u12525 \u12531 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12467 \u12531 \u12508 \u12508 \u12540 \u12490 \u12473 \u12398 \u28857 \u25968 \u12364 2\u20493 \u12395 \u12394 \u12427 \u65281 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 3000\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55356 \u57277 '\cf4 \strokec4  \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12398 \u12362 \u30399 \u12459 \u12473 \u12479 \u12510 \u12452 \u12474 \u12487 \u12540 \u12479 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 PLATE_ITEMS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_default'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u27161 \u28310 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12356 \u12388 \u12418 \u12398 \u30333 \u12356 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 0\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-slate-200 border-b-4 border-slate-300'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_wood'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u26408 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u28201 \u12363 \u12415 \u12398 \u12354 \u12427 \u26408 \u35069 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 500\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-amber-700 border-b-4 border-amber-900'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_red'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u36196 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u24773 \u29105 \u30340 \u12394 \u36196 \u12356 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-red-500 border-b-4 border-red-700'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_blue'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u38738 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12463 \u12540 \u12523 \u12394 \u38738 \u12356 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-blue-500 border-b-4 border-blue-700'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_green'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u32209 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u33258 \u28982 \u12434 \u24863 \u12376 \u12427 \u32209 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-emerald-500 border-b-4 border-emerald-700'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_yellowgreen'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u40644 \u32209 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u29245 \u12420 \u12363 \u12394 \u40644 \u32209 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-lime-400 border-b-4 border-lime-600'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_orange'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12458 \u12524 \u12531 \u12472 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u20803 \u27671 \u12394 \u12458 \u12524 \u12531 \u12472 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-500 border-b-4 border-orange-700'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_pink'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12500 \u12531 \u12463 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12363 \u12431 \u12356 \u12356 \u12500 \u12531 \u12463 \u33394 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1500\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-pink-300 border-b-4 border-pink-400'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_purple'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u32043 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u39640 \u36020 \u12394 \u32043 \u33394 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1500\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-purple-500 border-b-4 border-purple-700'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_indigo'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u34253 \u33394 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u28145 \u12356 \u34253 \u33394 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1500\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-indigo-600 border-b-4 border-indigo-800'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_black'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u40658 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12471 \u12483 \u12463 \u12394 \u40658 \u12356 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 2000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-slate-800 border-b-4 border-slate-900'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_gold'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u32020 \u37329 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u25104 \u37329 \u27671 \u20998 \u12391 \u12479 \u12452 \u12500 \u12531 \u12464 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 5000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-yellow-300 border-b-4 border-yellow-500 shadow-[0_0_15px_rgba(253,224,71,0.6)]'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'plate_rainbow'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12524 \u12452 \u12531 \u12508 \u12540 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u19971 \u33394 \u12395 \u36637 \u12367 \u20253 \u35500 \u12398 \u12362 \u30399 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 10000\cf6 \strokec6 ,\cf4 \strokec4  css\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 border-b-4 border-white animate-rainbow bg-[length:200%_auto]'\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12398 \u35373 \u20633 \u12487 \u12540 \u12479 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 FACILITY_ITEMS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'conveyor_switch'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12524 \u12540 \u12531 \u12398 \u38651 \u28304 \u12473 \u12452 \u12483 \u12481 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12524 \u12540 \u12531 \u12398 \u21205 \u12365 \u12434 \u27490 \u12417 \u12390 \u20013 \u22830 \u22266 \u23450 \u12395 \u12377 \u12427 \u12290 \u35211 \u36867 \u12375 \u12511 \u12473 \u12364 \u12394 \u12367 \u12394 \u12427 \u65281 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 2000\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55357 \u56588 '\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12398 \u12497 \u12531 \u12480 \u12398 \u24863 \u24773 \u12487 \u12540 \u12479 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 EMOTION_ITEMS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf6 \strokec6 \{\cf4 \strokec4  id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'emotion_angry'\cf6 \strokec6 ,\cf4 \strokec4  name\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u24594 \u12426 \u12398 \u12497 \u12531 \u12480 '\cf6 \strokec6 ,\cf4 \strokec4  desc\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12497 \u12531 \u12480 \u12364 \u24594 \u12387 \u12390 \u12524 \u12540 \u12531 \u12364 \u21152 \u36895 \u65281 \u20195 \u12431 \u12426 \u12395 \u29554 \u24471 \u12473 \u12467 \u12450 (\u12467 \u12452 \u12531 )\u12364 2\u20493 \u12395 \u65281 '\cf6 \strokec6 ,\cf4 \strokec4  price\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 3000\cf6 \strokec6 ,\cf4 \strokec4  emoji\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u55357 \u56482 '\cf4 \strokec4  \cf6 \strokec6 \},\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // \uc0\u23433 \u20840 \u12394 \u21177 \u26524 \u38899 \u20877 \u29983 \u65288 Web Audio API\u65289 \cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  playSound \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf2 \strokec2 type\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf2 \strokec2 try\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  \cf5 \strokec5 AudioContext\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  window\cf6 \strokec6 .\cf5 \strokec5 AudioContext\cf4 \strokec4  \cf6 \strokec6 ||\cf4 \strokec4  window\cf6 \strokec6 .\cf4 \strokec4 webkitAudioContext\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (!\cf5 \strokec5 AudioContext\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  ctx \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf5 \strokec5 AudioContext\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  osc \cf6 \strokec6 =\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 createOscillator\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  gain \cf6 \strokec6 =\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 createGain\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     osc\cf6 \strokec6 .\cf4 \strokec4 connect\cf6 \strokec6 (\cf4 \strokec4 gain\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     gain\cf6 \strokec6 .\cf4 \strokec4 connect\cf6 \strokec6 (\cf4 \strokec4 ctx\cf6 \strokec6 .\cf4 \strokec4 destination\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'type'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 'sine'\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 frequency\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 800\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.1\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 start\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 exponentialRampToValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.01\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.05\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 stop\cf6 \strokec6 (\cf4 \strokec4 ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.05\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 else\cf4 \strokec4  \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'miss'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 'sawtooth'\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 frequency\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 150\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.1\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 start\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 linearRampToValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.01\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 stop\cf6 \strokec6 (\cf4 \strokec4 ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 else\cf4 \strokec4  \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'clear'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 'triangle'\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 frequency\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 600\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 frequency\cf6 \strokec6 .\cf4 \strokec4 exponentialRampToValueAtTime\cf6 \strokec6 (\cf9 \strokec9 1200\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.1\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 start\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 linearRampToValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.01\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.2\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 stop\cf6 \strokec6 (\cf4 \strokec4 ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.2\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 else\cf4 \strokec4  \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'buy'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf8 \strokec8 // \uc0\u36092 \u20837 \u38899 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf2 \strokec2 type\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 'square'\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 frequency\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 400\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 frequency\cf6 \strokec6 .\cf4 \strokec4 linearRampToValueAtTime\cf6 \strokec6 (\cf9 \strokec9 800\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 setValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.1\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 start\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       gain\cf6 \strokec6 .\cf4 \strokec4 gain\cf6 \strokec6 .\cf4 \strokec4 linearRampToValueAtTime\cf6 \strokec6 (\cf9 \strokec9 0.01\cf6 \strokec6 ,\cf4 \strokec4  ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.3\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       osc\cf6 \strokec6 .\cf4 \strokec4 stop\cf6 \strokec6 (\cf4 \strokec4 ctx\cf6 \strokec6 .\cf4 \strokec4 currentTime \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 0.3\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 catch\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 e\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf8 \strokec8 // Audio context initialization failed\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  \cf2 \strokec2 function\cf4 \strokec4  \cf5 \strokec5 App\cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 gameState\cf6 \strokec6 ,\cf4 \strokec4  setGameState\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf7 \strokec7 'title'\cf6 \strokec6 );\cf4 \strokec4  \cf8 \strokec8 // 'title', 'playing', 'result', 'shop'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 shopTab\cf6 \strokec6 ,\cf4 \strokec4  setShopTab\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf7 \strokec7 'items'\cf6 \strokec6 );\cf4 \strokec4  \cf8 \strokec8 // 'items', 'plates', 'facilities', 'emotions'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 course\cf6 \strokec6 ,\cf4 \strokec4  setCourse\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf5 \strokec5 COURSES\cf6 \strokec6 .\cf4 \strokec4 normal\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 currentBread\cf6 \strokec6 ,\cf4 \strokec4  setCurrentBread\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf2 \strokec2 null\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 animKey\cf6 \strokec6 ,\cf4 \strokec4  setAnimKey\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12466 \u12540 \u12512 \u12473 \u12486 \u12540 \u12488 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 score\cf6 \strokec6 ,\cf4 \strokec4  setScore\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 timeLeft\cf6 \strokec6 ,\cf4 \strokec4  setTimeLeft\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 60\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 combo\cf6 \strokec6 ,\cf4 \strokec4  setCombo\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 maxCombo\cf6 \strokec6 ,\cf4 \strokec4  setMaxCombo\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 totalTyped\cf6 \strokec6 ,\cf4 \strokec4  setTotalTyped\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 missCount\cf6 \strokec6 ,\cf4 \strokec4  setMissCount\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 clearedBreads\cf6 \strokec6 ,\cf4 \strokec4  setClearedBreads\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12539 \u12452 \u12531 \u12505 \u12531 \u12488 \u12522 \u12473 \u12486 \u12540 \u12488 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 coins\cf6 \strokec6 ,\cf4 \strokec4  setCoins\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 inventory\cf6 \strokec6 ,\cf4 \strokec4  setInventory\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 ([]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 plateInventory\cf6 \strokec6 ,\cf4 \strokec4  setPlateInventory\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 ([\cf7 \strokec7 'plate_default'\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 activePlateId\cf6 \strokec6 ,\cf4 \strokec4  setActivePlateId\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf7 \strokec7 'plate_default'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 facilityInventory\cf6 \strokec6 ,\cf4 \strokec4  setFacilityInventory\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 ([]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 isConveyorOn\cf6 \strokec6 ,\cf4 \strokec4  setIsConveyorOn\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf2 \strokec2 true\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 emotionInventory\cf6 \strokec6 ,\cf4 \strokec4  setEmotionInventory\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 ([]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 activeEmotion\cf6 \strokec6 ,\cf4 \strokec4  setActiveEmotion\cf6 \strokec6 ]\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  useState\cf6 \strokec6 (\cf7 \strokec7 'normal'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  timerRef \cf6 \strokec6 =\cf4 \strokec4  useRef\cf6 \strokec6 (\cf2 \strokec2 null\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u21021 \u26399 \u12458 \u12540 \u12487 \u12451 \u12458 \u12525 \u12483 \u12463 \u35299 \u38500 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   useEffect\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  unlockAudio \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 const\cf4 \strokec4  audios \cf6 \strokec6 =\cf4 \strokec4  document\cf6 \strokec6 .\cf4 \strokec4 querySelectorAll\cf6 \strokec6 (\cf7 \strokec7 'audio'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       audios\cf6 \strokec6 .\cf4 \strokec4 forEach\cf6 \strokec6 (\cf4 \strokec4 audio \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 audio\cf6 \strokec6 .\cf4 \strokec4 paused\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           originalAudioPlay\cf6 \strokec6 .\cf4 \strokec4 call\cf6 \strokec6 (\cf4 \strokec4 audio\cf6 \strokec6 ).\cf2 \strokec2 catch\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\});\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf6 \strokec6 \});\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       window\cf6 \strokec6 .\cf4 \strokec4 removeEventListener\cf6 \strokec6 (\cf7 \strokec7 'click'\cf6 \strokec6 ,\cf4 \strokec4  unlockAudio\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       window\cf6 \strokec6 .\cf4 \strokec4 removeEventListener\cf6 \strokec6 (\cf7 \strokec7 'keydown'\cf6 \strokec6 ,\cf4 \strokec4  unlockAudio\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     window\cf6 \strokec6 .\cf4 \strokec4 addEventListener\cf6 \strokec6 (\cf7 \strokec7 'click'\cf6 \strokec6 ,\cf4 \strokec4  unlockAudio\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     window\cf6 \strokec6 .\cf4 \strokec4 addEventListener\cf6 \strokec6 (\cf7 \strokec7 'keydown'\cf6 \strokec6 ,\cf4 \strokec4  unlockAudio\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       window\cf6 \strokec6 .\cf4 \strokec4 removeEventListener\cf6 \strokec6 (\cf7 \strokec7 'click'\cf6 \strokec6 ,\cf4 \strokec4  unlockAudio\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       window\cf6 \strokec6 .\cf4 \strokec4 removeEventListener\cf6 \strokec6 (\cf7 \strokec7 'keydown'\cf6 \strokec6 ,\cf4 \strokec4  unlockAudio\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \},\cf4 \strokec4  \cf6 \strokec6 []);\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12521 \u12531 \u12480 \u12512 \u12394 \u12497 \u12531 \u12434 \u12524 \u12540 \u12531 \u12395 \u27969 \u12377 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  spawnWord \cf6 \strokec6 =\cf4 \strokec4  useCallback\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 let\cf4 \strokec4  words \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [...\cf5 \strokec5 BREAD_WORDS\cf6 \strokec6 ];\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf8 \strokec8 // \uc0\u12450 \u12452 \u12486 \u12512 \u21177 \u26524 : \u39640 \u32026 \u12497 \u12531 \u12524 \u12471 \u12500 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 inventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf7 \strokec7 'premium_bread'\cf6 \strokec6 ))\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       words \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 [...\cf4 \strokec4 words\cf6 \strokec6 ,\cf4 \strokec4  \cf6 \strokec6 ...\cf5 \strokec5 PREMIUM_BREADS\cf6 \strokec6 ];\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  nextWord \cf6 \strokec6 =\cf4 \strokec4  words\cf6 \strokec6 [\cf5 \strokec5 Math\cf6 \strokec6 .\cf4 \strokec4 floor\cf6 \strokec6 (\cf5 \strokec5 Math\cf6 \strokec6 .\cf4 \strokec4 random\cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  words\cf6 \strokec6 .\cf4 \strokec4 length\cf6 \strokec6 )];\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setCurrentBread\cf6 \strokec6 (\{\cf4 \strokec4  word\cf6 \strokec6 :\cf4 \strokec4  nextWord\cf6 \strokec6 ,\cf4 \strokec4  typedCount\cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 0\cf4 \strokec4  \cf6 \strokec6 \});\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setAnimKey\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \},\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 inventory\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12466 \u12540 \u12512 \u38283 \u22987 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  startGame \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 selectedCourse\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf8 \strokec8 // \uc0\u12450 \u12452 \u12486 \u12512 \u21177 \u26524 : \u37329 \u12398 \u12479 \u12452 \u12510 \u12540 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  baseGameTime \cf6 \strokec6 =\cf4 \strokec4  inventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf7 \strokec7 'golden_timer'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf9 \strokec9 75\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 60\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setCourse\cf6 \strokec6 (\cf4 \strokec4 selectedCourse\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setScore\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setTimeLeft\cf6 \strokec6 (\cf4 \strokec4 baseGameTime\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setCombo\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setMaxCombo\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setTotalTyped\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setMissCount\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setClearedBreads\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setGameState\cf6 \strokec6 (\cf7 \strokec7 'playing'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     spawnWord\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 timerRef\cf6 \strokec6 .\cf4 \strokec4 current\cf6 \strokec6 )\cf4 \strokec4  clearInterval\cf6 \strokec6 (\cf4 \strokec4 timerRef\cf6 \strokec6 .\cf4 \strokec4 current\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     timerRef\cf6 \strokec6 .\cf4 \strokec4 current \cf6 \strokec6 =\cf4 \strokec4  setInterval\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setTimeLeft\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 -\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \},\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12479 \u12452 \u12512 \u12450 \u12483 \u12503 \u26178 \u12398 \u20966 \u29702 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   useEffect\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'playing'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  timeLeft \cf6 \strokec6 <=\cf4 \strokec4  \cf9 \strokec9 0\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       clearInterval\cf6 \strokec6 (\cf4 \strokec4 timerRef\cf6 \strokec6 .\cf4 \strokec4 current\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setGameState\cf6 \strokec6 (\cf7 \strokec7 'result'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf8 \strokec8 // \uc0\u29554 \u24471 \u12473 \u12467 \u12450 \u12434 \u12381 \u12398 \u12414 \u12414 \u12467 \u12452 \u12531 \u12395 \u21152 \u31639 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setCoins\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  score\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \},\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 timeLeft\cf6 \strokec6 ,\cf4 \strokec4  gameState\cf6 \strokec6 ,\cf4 \strokec4  score\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12497 \u12531 \u12364 \u24038 \u31471 \u12414 \u12391 \u27969 \u12428 \u20999 \u12387 \u12383 \u65288 \u35211 \u36867 \u12375 \u12511 \u12473 \u65289 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  handleMissWord \cf6 \strokec6 =\cf4 \strokec4  useCallback\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 !==\cf4 \strokec4  \cf7 \strokec7 'playing'\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     playSound\cf6 \strokec6 (\cf7 \strokec7 'miss'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setCombo\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setMissCount\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     spawnWord\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \},\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 gameState\cf6 \strokec6 ,\cf4 \strokec4  spawnWord\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12479 \u12452 \u12500 \u12531 \u12464 \u20966 \u29702 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   useEffect\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 const\cf4 \strokec4  handleKeyDown \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 e\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 !==\cf4 \strokec4  \cf7 \strokec7 'playing'\cf4 \strokec4  \cf6 \strokec6 ||\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 currentBread\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 ([\cf7 \strokec7 'Shift'\cf6 \strokec6 ,\cf4 \strokec4  \cf7 \strokec7 'Control'\cf6 \strokec6 ,\cf4 \strokec4  \cf7 \strokec7 'Alt'\cf6 \strokec6 ,\cf4 \strokec4  \cf7 \strokec7 'Meta'\cf6 \strokec6 ,\cf4 \strokec4  \cf7 \strokec7 'Tab'\cf6 \strokec6 ,\cf4 \strokec4  \cf7 \strokec7 'Enter'\cf6 \strokec6 ,\cf4 \strokec4  \cf7 \strokec7 'Backspace'\cf6 \strokec6 ].\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 e\cf6 \strokec6 .\cf4 \strokec4 key\cf6 \strokec6 ))\cf4 \strokec4  \cf2 \strokec2 return\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4       \cf2 \strokec2 const\cf4 \strokec4  expectedChar \cf6 \strokec6 =\cf4 \strokec4  currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 romaji\cf6 \strokec6 [\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 typedCount\cf6 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 e\cf6 \strokec6 .\cf4 \strokec4 key\cf6 \strokec6 .\cf4 \strokec4 toLowerCase\cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 ===\cf4 \strokec4  expectedChar\cf6 \strokec6 .\cf4 \strokec4 toLowerCase\cf6 \strokec6 ())\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         playSound\cf6 \strokec6 (\cf7 \strokec7 'type'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf2 \strokec2 const\cf4 \strokec4  newTypedCount \cf6 \strokec6 =\cf4 \strokec4  currentBread\cf6 \strokec6 .\cf4 \strokec4 typedCount \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         setTotalTyped\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf2 \strokec2 const\cf4 \strokec4  newCombo \cf6 \strokec6 =\cf4 \strokec4  combo \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         setCombo\cf6 \strokec6 (\cf4 \strokec4 newCombo\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         setMaxCombo\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  \cf5 \strokec5 Math\cf6 \strokec6 .\cf4 \strokec4 max\cf6 \strokec6 (\cf4 \strokec4 prev\cf6 \strokec6 ,\cf4 \strokec4  newCombo\cf6 \strokec6 ));\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4         \cf8 \strokec8 // \uc0\u12450 \u12452 \u12486 \u12512 \u21177 \u26524 : \u29305 \u35069 \u12456 \u12503 \u12525 \u12531 \u12391 \u12467 \u12531 \u12508 \u12508 \u12540 \u12490 \u12473 2\u20493 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf2 \strokec2 const\cf4 \strokec4  bonusMultiplier \cf6 \strokec6 =\cf4 \strokec4  inventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf7 \strokec7 'panda_apron'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf9 \strokec9 2\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf2 \strokec2 const\cf4 \strokec4  comboBonus \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 Math\cf6 \strokec6 .\cf4 \strokec4 floor\cf6 \strokec6 (\cf4 \strokec4 newCombo \cf6 \strokec6 /\cf4 \strokec4  \cf9 \strokec9 10\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  \cf9 \strokec9 5\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  bonusMultiplier\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf8 \strokec8 // \uc0\u12450 \u12452 \u12486 \u12512 \u21177 \u26524 : \u24594 \u12426 \u12398 \u12497 \u12531 \u12480 \u12391 \u29554 \u24471 \u12473 \u12467 \u12450 (\u12467 \u12452 \u12531 )2\u20493 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf2 \strokec2 const\cf4 \strokec4  emotionMultiplier \cf6 \strokec6 =\cf4 \strokec4  activeEmotion \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'emotion_angry'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf9 \strokec9 2\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         setScore\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf6 \strokec6 (\cf9 \strokec9 10\cf4 \strokec4  \cf6 \strokec6 +\cf4 \strokec4  comboBonus\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  emotionMultiplier\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4         \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 newTypedCount \cf6 \strokec6 ===\cf4 \strokec4  currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 romaji\cf6 \strokec6 .\cf4 \strokec4 length\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           playSound\cf6 \strokec6 (\cf7 \strokec7 'clear'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           setScore\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 romaji\cf6 \strokec6 .\cf4 \strokec4 length \cf6 \strokec6 *\cf4 \strokec4  \cf9 \strokec9 10\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  emotionMultiplier\cf6 \strokec6 ));\cf4 \strokec4  \cf8 \strokec8 // \uc0\u12463 \u12522 \u12450 \u12508 \u12540 \u12490 \u12473 \u12418 \u20493 \u22679 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           setClearedBreads\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           spawnWord\cf6 \strokec6 ();\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 else\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           setCurrentBread\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 (\{\cf4 \strokec4  \cf6 \strokec6 ...\cf4 \strokec4 prev\cf6 \strokec6 ,\cf4 \strokec4  typedCount\cf6 \strokec6 :\cf4 \strokec4  newTypedCount \cf6 \strokec6 \}));\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf6 \strokec6 \}\cf4 \strokec4  \cf2 \strokec2 else\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         playSound\cf6 \strokec6 (\cf7 \strokec7 'miss'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         setCombo\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         setMissCount\cf6 \strokec6 ((\cf4 \strokec4 prev\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4     window\cf6 \strokec6 .\cf4 \strokec4 addEventListener\cf6 \strokec6 (\cf7 \strokec7 'keydown'\cf6 \strokec6 ,\cf4 \strokec4  handleKeyDown\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  window\cf6 \strokec6 .\cf4 \strokec4 removeEventListener\cf6 \strokec6 (\cf7 \strokec7 'keydown'\cf6 \strokec6 ,\cf4 \strokec4  handleKeyDown\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \},\cf4 \strokec4  \cf6 \strokec6 [\cf4 \strokec4 gameState\cf6 \strokec6 ,\cf4 \strokec4  currentBread\cf6 \strokec6 ,\cf4 \strokec4  combo\cf6 \strokec6 ,\cf4 \strokec4  spawnWord\cf6 \strokec6 ,\cf4 \strokec4  inventory\cf6 \strokec6 ,\cf4 \strokec4  activeEmotion\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   useEffect\cf6 \strokec6 (()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 timerRef\cf6 \strokec6 .\cf4 \strokec4 current\cf6 \strokec6 )\cf4 \strokec4  clearInterval\cf6 \strokec6 (\cf4 \strokec4 timerRef\cf6 \strokec6 .\cf4 \strokec4 current\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \},\cf4 \strokec4  \cf6 \strokec6 []);\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12391 \u12398 \u36092 \u20837 \u20966 \u29702 \u65288 \u20415 \u21033 \u12450 \u12452 \u12486 \u12512 \u65289 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  handleBuyItem \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 coins \cf6 \strokec6 >=\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 inventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ))\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setCoins\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 -\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setInventory\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 [...\cf4 \strokec4 prev\cf6 \strokec6 ,\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       playSound\cf6 \strokec6 (\cf7 \strokec7 'buy'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12391 \u12398 \u36092 \u20837 \u20966 \u29702 \u65288 \u12362 \u30399 \u65289 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  handleBuyPlate \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 plate\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 coins \cf6 \strokec6 >=\cf4 \strokec4  plate\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 plateInventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ))\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setCoins\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 -\cf4 \strokec4  plate\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setPlateInventory\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 [...\cf4 \strokec4 prev\cf6 \strokec6 ,\cf4 \strokec4  plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setActivePlateId\cf6 \strokec6 (\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \strokec4  \cf8 \strokec8 // \uc0\u36092 \u20837 \u12375 \u12383 \u12425 \u33258 \u21205 \u12391 \u35013 \u20633 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       playSound\cf6 \strokec6 (\cf7 \strokec7 'buy'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12391 \u12398 \u36092 \u20837 \u20966 \u29702 \u65288 \u35373 \u20633 \u65289 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  handleBuyFacility \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 coins \cf6 \strokec6 >=\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 facilityInventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ))\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setCoins\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 -\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setFacilityInventory\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 [...\cf4 \strokec4 prev\cf6 \strokec6 ,\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       playSound\cf6 \strokec6 (\cf7 \strokec7 'buy'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12471 \u12519 \u12483 \u12503 \u12391 \u12398 \u36092 \u20837 \u20966 \u29702 \u65288 \u24863 \u24773 \u65289 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  handleBuyEmotion \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 coins \cf6 \strokec6 >=\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 emotionInventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ))\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setCoins\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  prev \cf6 \strokec6 -\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setEmotionInventory\cf6 \strokec6 (\cf4 \strokec4 prev \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 [...\cf4 \strokec4 prev\cf6 \strokec6 ,\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ]);\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       setActiveEmotion\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \strokec4  \cf8 \strokec8 // \uc0\u36092 \u20837 \u12375 \u12383 \u12425 \u33258 \u21205 \u12391 ON\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       playSound\cf6 \strokec6 (\cf7 \strokec7 'buy'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12362 \u30399 \u12398 \u35013 \u20633 \u20966 \u29702 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  handleEquipPlate \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 plateId\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     setActivePlateId\cf6 \strokec6 (\cf4 \strokec4 plateId\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     playSound\cf6 \strokec6 (\cf7 \strokec7 'type'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  accuracy \cf6 \strokec6 =\cf4 \strokec4  totalTyped \cf6 \strokec6 +\cf4 \strokec4  missCount \cf6 \strokec6 ===\cf4 \strokec4  \cf9 \strokec9 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf9 \strokec9 0\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 Math\cf6 \strokec6 .\cf4 \strokec4 floor\cf6 \strokec6 ((\cf4 \strokec4 totalTyped \cf6 \strokec6 /\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 totalTyped \cf6 \strokec6 +\cf4 \strokec4  missCount\cf6 \strokec6 ))\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  \cf9 \strokec9 100\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u12497 \u12531 \u12480 \u12398 \u12475 \u12522 \u12501 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  getPandaMessage \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 ()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'title'\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12497 \u12531 \u23627 \u12408 \u12424 \u12358 \u12371 \u12381 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'shop'\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u31292 \u12356 \u12384 \u12467 \u12452 \u12531 \u12391 \u36023 \u12356 \u29289 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'playing'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 activeEmotion \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'emotion_angry'\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u26089 \u12367 \u21462 \u12427 \u12497 \u12531 \u65281 \u65281 \u55357 \u56482 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 combo \cf6 \strokec6 >\cf4 \strokec4  \cf9 \strokec9 20\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12377 \u12372 \u12356 \u12506 \u12540 \u12473 \u12384 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 combo \cf6 \strokec6 >\cf4 \strokec4  \cf9 \strokec9 10\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12381 \u12398 \u35519 \u23376 \u12384 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 timeLeft \cf6 \strokec6 <=\cf4 \strokec4  \cf9 \strokec9 10\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12356 \u12381 \u12370 \u12356 \u12381 \u12370 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u27969 \u12428 \u12427 \u12497 \u12531 \u12434 \u25171 \u12388 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'result'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 score \cf6 \strokec6 >\cf4 \strokec4  \cf9 \strokec9 3000\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u21531 \u12399 \u12510 \u12473 \u12479 \u12540 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 score \cf6 \strokec6 >\cf4 \strokec4  \cf9 \strokec9 1000\cf6 \strokec6 )\cf4 \strokec4  \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12394 \u12363 \u12394 \u12363 \u12420 \u12427 \u12497 \u12531 \u12397 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf2 \strokec2 return\cf4 \strokec4  \cf7 \strokec7 '\uc0\u12414 \u12383 \u25361 \u25126 \u12375 \u12390 \u12497 \u12531 \u65281 '\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 \};\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  baseGameTime \cf6 \strokec6 =\cf4 \strokec4  inventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf7 \strokec7 'golden_timer'\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf9 \strokec9 75\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 60\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf8 \strokec8 // \uc0\u29694 \u22312 \u35013 \u20633 \u20013 \u12398 \u12362 \u30399 \u12487 \u12540 \u12479 \u12434 \u21462 \u24471 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf2 \strokec2 const\cf4 \strokec4  activePlate \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 PLATE_ITEMS\cf6 \strokec6 .\cf4 \strokec4 find\cf6 \strokec6 (\cf4 \strokec4 p \cf6 \strokec6 =>\cf4 \strokec4  p\cf6 \strokec6 .\cf4 \strokec4 id \cf6 \strokec6 ===\cf4 \strokec4  activePlateId\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 ||\cf4 \strokec4  \cf5 \strokec5 PLATE_ITEMS\cf6 \strokec6 [\cf9 \strokec9 0\cf6 \strokec6 ];\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4   \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "min-h-screen bg-orange-50 text-amber-900 flex flex-col items-center justify-center p-4 font-sans selection:bg-orange-200"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf6 \strokec6 <\cf4 \strokec4 style\cf6 \strokec6 >\{\cf7 \strokec7 `\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7         @keyframes flow \{\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           0% \{ left: 100%; transform: translate(0, -50%); opacity: 0; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           5% \{ opacity: 1; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           95% \{ opacity: 1; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           100% \{ left: -10%; transform: translate(-100%, -50%); opacity: 0; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         @keyframes conveyor \{\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           0% \{ background-position: 0 0; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           100% \{ background-position: -40px 0; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         @keyframes rainbow \{\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           0% \{ background-position: 0% 50%; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           50% \{ background-position: 100% 50%; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           100% \{ background-position: 0% 50%; \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         .animate-rainbow \{\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7           animation: rainbow 3s ease infinite;\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7         \}\cf4 \cb1 \strokec4 \
\cf7 \cb3 \strokec7       `\cf6 \strokec6 \}</\cf4 \strokec4 style\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-orange-100 relative overflow-hidden"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u32972 \u26223 \u12398 \u35013 \u39166  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "absolute top-0 left-0 w-full h-4 bg-orange-400 opacity-20"\cf4 \strokec4  />\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u21491 \u19978 \u12398 \u12467 \u12452 \u12531 \u34920 \u31034  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "absolute top-6 right-6 bg-orange-50 px-4 py-2 rounded-full border-2 border-orange-200 font-black text-orange-600 shadow-sm z-20 flex items-center gap-2"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-xl"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u55357 \u56496 \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 span\cf6 \strokec6 >\{\cf4 \strokec4 coins\cf6 \strokec6 \}\cf4 \strokec4  \cf5 \strokec5 C\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u24215 \u21729 \u12398 \u12497 \u12531 \u12480  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "absolute top-6 left-6 flex items-start gap-3 z-20"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-5xl md:text-6xl drop-shadow-md animate-bounce relative"\cf4 \strokec4  style\cf6 \strokec6 =\{\{\cf4 \strokec4  animationDuration\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '2s'\cf4 \strokec4  \cf6 \strokec6 \}\}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf10 \strokec10 \uc0\u55357 \u56380 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf4 \strokec4 activeEmotion \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'emotion_angry'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "absolute -top-2 -left-2 text-3xl drop-shadow-sm animate-pulse"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u55357 \u56482 \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "mt-2 bg-white px-4 py-2 rounded-2xl shadow-md border-2 border-slate-200 text-sm md:text-base font-bold text-slate-700 relative whitespace-nowrap"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf4 \strokec4 getPandaMessage\cf6 \strokec6 ()\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "absolute top-1/2 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent -translate-y-1/2 drop-shadow-sm"\cf4 \strokec4 ></div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* === \uc0\u12479 \u12452 \u12488 \u12523 \u30011 \u38754  === */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'title'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center pt-28 pb-12"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 h1 className\cf6 \strokec6 =\cf7 \strokec7 "text-5xl md:text-7xl font-black text-orange-500 mb-4 tracking-wider drop-shadow-sm"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u55356 \u57182 \cf4 \strokec4  \cf10 \strokec10 \uc0\u12497 \u12531 \u25171 \cf4 \strokec4  \cf10 \strokec10 \uc0\u55358 \u56656 \cf6 \strokec6 </\cf4 \strokec4 h1\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-xl text-amber-700 font-bold mb-10"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u12316 \cf4 \strokec4  \cf10 \strokec10 \uc0\u27969 \u12428 \u12427 \u12505 \u12540 \u12459 \u12522 \u12540 \u12539 \u12479 \u12452 \u12500 \u12531 \u12464 \cf4 \strokec4  \cf10 \strokec10 \uc0\u12316 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-orange-100/50 p-6 rounded-2xl inline-block text-left mb-10 border border-orange-200"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 ul className\cf6 \strokec6 =\cf7 \strokec7 "list-disc list-inside text-amber-900 space-y-2 font-medium"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 li\cf6 \strokec6 >\cf10 \strokec10 \uc0\u21491 \u12363 \u12425 \u24038 \u12408 \u27969 \u12428 \u12427 \u12497 \u12531 \u12398 \u21517 \u21069 \u12434 \u12479 \u12452 \u12500 \u12531 \u12464 \u12375 \u12424 \u12358 \u65281 \cf6 \strokec6 </\cf4 \strokec4 li\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 li\cf6 \strokec6 >\cf10 \strokec10 \uc0\u24038 \u31471 \u12395 \u28040 \u12360 \u12427 \u21069 \u12395 \u25171 \u12385 \u20999 \u12425 \u12394 \u12356 \u12392 \u12511 \u12473 \u12395 \u12394 \u12426 \u12414 \u12377 \u12290 \cf6 \strokec6 </\cf4 \strokec4 li\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 li\cf6 \strokec6 >\cf10 \strokec10 \uc0\u21046 \u38480 \u26178 \u38291 \u12399 \cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 strong\cf6 \strokec6 >\{\cf4 \strokec4 baseGameTime\cf6 \strokec6 \}\cf10 \strokec10 \uc0\u31186 \cf6 \strokec6 </\cf4 \strokec4 strong\cf6 \strokec6 >\cf4 \strokec4  \cf10 \strokec10 \uc0\u12391 \u12377 \u12290 \cf6 \strokec6 </\cf4 \strokec4 li\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 li className\cf6 \strokec6 =\cf7 \strokec7 "text-orange-600 text-sm mt-4"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u8251 \cf5 \strokec5 IME\cf10 \strokec10 \uc0\u65288 \u26085 \u26412 \u35486 \u20837 \u21147 \u65289 \u12434 \u12458 \u12501 \u12395 \u12375 \u12289 \u21322 \u35282 \u33521 \u25968 \u12391 \u12503 \u12524 \u12452 \u12375 \u12390 \u12367 \u12384 \u12373 \u12356 \u12290 \cf6 \strokec6 </\cf4 \strokec4 li\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 ul\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-lg font-bold text-amber-800 mb-4"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u38627 \u26131 \u24230 \u12434 \u36984 \u12435 \u12391 \u12473 \u12479 \u12540 \u12488 \u65281 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex flex-wrap justify-center gap-4 mb-8"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 \{\cf5 \strokec5 Object\cf6 \strokec6 .\cf4 \strokec4 values\cf6 \strokec6 (\cf5 \strokec5 COURSES\cf6 \strokec6 ).\cf4 \strokec4 map\cf6 \strokec6 (\cf4 \strokec4 c \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   key\cf6 \strokec6 =\{\cf4 \strokec4 c\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  startGame\cf6 \strokec6 (\cf4 \strokec4 c\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   className\cf6 \strokec6 =\{\cf7 \strokec7 `px-8 py-4 rounded-xl text-white font-black text-xl border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-lg \cf6 \strokec6 $\{\cf4 \strokec4 c\cf6 \strokec6 .\cf4 \strokec4 color\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 \{\cf4 \strokec4 c\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 ))\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex justify-center"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setGameState\cf6 \strokec6 (\cf7 \strokec7 'shop'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\cf7 \strokec7 "px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-2xl"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u55357 \u57042 \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4  \cf10 \strokec10 \uc0\u12471 \u12519 \u12483 \u12503 \u12408 \u34892 \u12367 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* === \uc0\u12471 \u12519 \u12483 \u12503 \u30011 \u38754  === */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'shop'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "pt-28 pb-12 px-4 md:px-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf7 \strokec7 "text-4xl font-black text-amber-800 mb-6 text-center"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u55357 \u57042 \cf4 \strokec4  \cf10 \strokec10 \uc0\u12497 \u12531 \u12480 \u12471 \u12519 \u12483 \u12503 \cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u12471 \u12519 \u12483 \u12503 \u12398 \u12479 \u12502 \u20999 \u12426 \u26367 \u12360  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex justify-center flex-wrap gap-2 md:gap-4 mb-8"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setShopTab\cf6 \strokec6 (\cf7 \strokec7 'items'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\{\cf7 \strokec7 `px-4 md:px-6 py-2 rounded-full font-bold transition-all \cf6 \strokec6 $\{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'items'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-500 text-white shadow-inner'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 text-amber-800 hover:bg-orange-200'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf10 \strokec10 \uc0\u20415 \u21033 \u12450 \u12452 \u12486 \u12512 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setShopTab\cf6 \strokec6 (\cf7 \strokec7 'plates'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\{\cf7 \strokec7 `px-4 md:px-6 py-2 rounded-full font-bold transition-all \cf6 \strokec6 $\{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'plates'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-500 text-white shadow-inner'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 text-amber-800 hover:bg-orange-200'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf10 \strokec10 \uc0\u12362 \u30399 \u12459 \u12473 \u12479 \u12510 \u12452 \u12474 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setShopTab\cf6 \strokec6 (\cf7 \strokec7 'facilities'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\{\cf7 \strokec7 `px-4 md:px-6 py-2 rounded-full font-bold transition-all \cf6 \strokec6 $\{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'facilities'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-500 text-white shadow-inner'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 text-amber-800 hover:bg-orange-200'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf10 \strokec10 \uc0\u35373 \u20633 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setShopTab\cf6 \strokec6 (\cf7 \strokec7 'emotions'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\{\cf7 \strokec7 `px-4 md:px-6 py-2 rounded-full font-bold transition-all \cf6 \strokec6 $\{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'emotions'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-500 text-white shadow-inner'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 text-amber-800 hover:bg-orange-200'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf10 \strokec10 \uc0\u12497 \u12531 \u12480 \u12398 \u24863 \u24773 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u12450 \u12452 \u12486 \u12512 \u12467 \u12540 \u12490 \u12540  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'items'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "grid gap-4 max-w-2xl mx-auto mb-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \{\cf5 \strokec5 SHOP_ITEMS\cf6 \strokec6 .\cf4 \strokec4 map\cf6 \strokec6 (\cf4 \strokec4 item \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  isBought \cf6 \strokec6 =\cf4 \strokec4  inventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  canBuy \cf6 \strokec6 =\cf4 \strokec4  coins \cf6 \strokec6 >=\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 isBought\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 \}\cf4 \strokec4  className\cf6 \strokec6 =\{\cf7 \strokec7 `p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors \cf6 \strokec6 $\{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-slate-50 border-slate-200'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-50 border-orange-100 hover:border-orange-300'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex items-center gap-4 text-center md:text-left"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\{\cf7 \strokec7 `text-5xl \cf6 \strokec6 $\{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'opacity-50'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 ''\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 emoji\cf6 \strokec6 \}</\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\{\cf7 \strokec7 `text-xl font-bold \cf6 \strokec6 $\{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-slate-500'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-amber-900'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}</\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\{\cf7 \strokec7 `text-sm \cf6 \strokec6 $\{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-slate-400'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-amber-700'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 desc\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center md:text-right shrink-0"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{!\cf4 \strokec4 isBought \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-lg font-bold text-orange-500 mb-2"\cf6 \strokec6 >\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 \}\cf4 \strokec4  \cf5 \strokec5 C\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           disabled\cf6 \strokec6 =\{!\cf4 \strokec4 canBuy\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  handleBuyItem\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold text-white shadow-md transition-all \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-slate-400 cursor-not-allowed'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             canBuy \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf7 \strokec7 'bg-rose-300 cursor-not-allowed'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 \{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 '\uc0\u36092 \u20837 \u28168 \u12415 '\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u36092 \u20837 \u12377 \u12427 '\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \})\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u12362 \u30399 \u12467 \u12540 \u12490 \u12540  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'plates'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "grid gap-4 max-w-2xl mx-auto mb-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \{\cf5 \strokec5 PLATE_ITEMS\cf6 \strokec6 .\cf4 \strokec4 map\cf6 \strokec6 (\cf4 \strokec4 plate \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  isOwned \cf6 \strokec6 =\cf4 \strokec4  plateInventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  canBuy \cf6 \strokec6 =\cf4 \strokec4  coins \cf6 \strokec6 >=\cf4 \strokec4  plate\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 isOwned\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  isEquipped \cf6 \strokec6 =\cf4 \strokec4  activePlateId \cf6 \strokec6 ===\cf4 \strokec4  plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4                   \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\{\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 \}\cf4 \strokec4  className\cf6 \strokec6 =\{\cf7 \strokec7 `p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors \cf6 \strokec6 $\{\cf4 \strokec4 isEquipped \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 border-orange-400'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  isOwned \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-slate-50 border-slate-200'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-50 border-orange-100 hover:border-orange-300'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex items-center gap-4 text-center md:text-left w-full md:w-auto"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\{\cf7 \strokec7 `w-16 h-8 rounded-[100%] mx-auto md:mx-0 shadow-md \cf6 \strokec6 $\{\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 css\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \strokec4 ></div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\{\cf7 \strokec7 `text-xl font-bold \cf6 \strokec6 $\{\cf4 \strokec4 isOwned \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-amber-900'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-amber-900'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \{\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4 isEquipped \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2 align-middle"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u35013 \u20633 \u20013 \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\{\cf7 \strokec7 `text-sm \cf6 \strokec6 $\{\cf4 \strokec4 isOwned \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-amber-700'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-amber-700'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\{\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 desc\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center md:text-right shrink-0"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{!\cf4 \strokec4 isOwned \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-lg font-bold text-orange-500 mb-2"\cf6 \strokec6 >\{\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 \}\cf4 \strokec4  \cf5 \strokec5 C\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{\cf4 \strokec4 isOwned \cf6 \strokec6 ?\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             disabled\cf6 \strokec6 =\{\cf4 \strokec4 isEquipped\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  handleEquipPlate\cf6 \strokec6 (\cf4 \strokec4 plate\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold shadow-md transition-all \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               isEquipped \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-slate-400 text-white cursor-not-allowed'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-blue-500 hover:bg-blue-400 text-white active:translate-y-1 border-b-4 border-blue-600 active:border-b-0'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \{\cf4 \strokec4 isEquipped \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 '\uc0\u35013 \u20633 \u20013 '\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u35013 \u20633 \u12377 \u12427 '\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             disabled\cf6 \strokec6 =\{!\cf4 \strokec4 canBuy\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  handleBuyPlate\cf6 \strokec6 (\cf4 \strokec4 plate\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold text-white shadow-md transition-all \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               canBuy \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               \cf7 \strokec7 'bg-rose-300 cursor-not-allowed'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf10 \strokec10 \uc0\u36092 \u20837 \u12377 \u12427 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \})\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u35373 \u20633 \u12467 \u12540 \u12490 \u12540  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'facilities'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "grid gap-4 max-w-2xl mx-auto mb-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \{\cf5 \strokec5 FACILITY_ITEMS\cf6 \strokec6 .\cf4 \strokec4 map\cf6 \strokec6 (\cf4 \strokec4 item \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  isBought \cf6 \strokec6 =\cf4 \strokec4  facilityInventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  canBuy \cf6 \strokec6 =\cf4 \strokec4  coins \cf6 \strokec6 >=\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 isBought\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 \}\cf4 \strokec4  className\cf6 \strokec6 =\{\cf7 \strokec7 `p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors \cf6 \strokec6 $\{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 border-orange-400'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-50 border-orange-100 hover:border-orange-300'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex items-center gap-4 text-center md:text-left"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\{\cf7 \strokec7 `text-5xl`\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 emoji\cf6 \strokec6 \}</\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\{\cf7 \strokec7 `text-xl font-bold text-amber-900`\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}</\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\{\cf7 \strokec7 `text-sm text-amber-700`\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 desc\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center md:text-right shrink-0"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{!\cf4 \strokec4 isBought \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-lg font-bold text-orange-500 mb-2"\cf6 \strokec6 >\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 \}\cf4 \strokec4  \cf5 \strokec5 C\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               setIsConveyorOn\cf6 \strokec6 (!\cf4 \strokec4 isConveyorOn\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               playSound\cf6 \strokec6 (\cf7 \strokec7 'type'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold shadow-md transition-all text-white border-b-4 active:border-b-0 active:translate-y-1 \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               isConveyorOn \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-blue-500 hover:bg-blue-400 border-blue-600'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-slate-500 hover:bg-slate-400 border-slate-600'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \{\cf4 \strokec4 isConveyorOn \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 '\uc0\u31292 \u20685 \u20013  (OFF\u12395 \u12377 \u12427 )'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '\uc0\u20572 \u27490 \u20013  (ON\u12395 \u12377 \u12427 )'\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             disabled\cf6 \strokec6 =\{!\cf4 \strokec4 canBuy\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  handleBuyFacility\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold text-white shadow-md transition-all \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               canBuy \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               \cf7 \strokec7 'bg-rose-300 cursor-not-allowed'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf10 \strokec10 \uc0\u36092 \u20837 \u12377 \u12427 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \})\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u24863 \u24773 \u12467 \u12540 \u12490 \u12540  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf4 \strokec4 shopTab \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'emotions'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "grid gap-4 max-w-2xl mx-auto mb-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \{\cf5 \strokec5 EMOTION_ITEMS\cf6 \strokec6 .\cf4 \strokec4 map\cf6 \strokec6 (\cf4 \strokec4 item \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  isBought \cf6 \strokec6 =\cf4 \strokec4  emotionInventory\cf6 \strokec6 .\cf4 \strokec4 includes\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  canBuy \cf6 \strokec6 =\cf4 \strokec4  coins \cf6 \strokec6 >=\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 price \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 isBought\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf2 \strokec2 const\cf4 \strokec4  isActive \cf6 \strokec6 =\cf4 \strokec4  activeEmotion \cf6 \strokec6 ===\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 ;\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4                   \cf2 \strokec2 return\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 \}\cf4 \strokec4  className\cf6 \strokec6 =\{\cf7 \strokec7 `p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors \cf6 \strokec6 $\{\cf4 \strokec4 isActive \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-orange-100 border-orange-400'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-slate-50 border-slate-200'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-orange-50 border-orange-100 hover:border-orange-300'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex items-center gap-4 text-center md:text-left"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\{\cf7 \strokec7 `text-5xl \cf6 \strokec6 $\{!\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'opacity-80'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 ''\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 emoji\cf6 \strokec6 \}</\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\{\cf7 \strokec7 `text-xl font-bold \cf6 \strokec6 $\{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-amber-900'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-amber-900'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4 isActive \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2 align-middle"\cf6 \strokec6 >\cf5 \strokec5 ON\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\{\cf7 \strokec7 `text-sm text-amber-700`\cf6 \strokec6 \}>\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 desc\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center md:text-right shrink-0"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{!\cf4 \strokec4 isBought \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-lg font-bold text-orange-500 mb-2"\cf6 \strokec6 >\{\cf4 \strokec4 item\cf6 \strokec6 .\cf4 \strokec4 price\cf6 \strokec6 \}\cf4 \strokec4  \cf5 \strokec5 C\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{\cf4 \strokec4 isBought \cf6 \strokec6 ?\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               setActiveEmotion\cf6 \strokec6 (\cf4 \strokec4 isActive \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'normal'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  item\cf6 \strokec6 .\cf4 \strokec4 id\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               playSound\cf6 \strokec6 (\cf7 \strokec7 'type'\cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold shadow-md transition-all text-white border-b-4 active:border-b-0 active:translate-y-1 \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               isActive \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-slate-500 hover:bg-slate-400 border-slate-600'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'bg-blue-500 hover:bg-blue-400 border-blue-600'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \{\cf4 \strokec4 isActive \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'OFF\uc0\u12395 \u12377 \u12427 '\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'ON\uc0\u12395 \u12377 \u12427 '\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             disabled\cf6 \strokec6 =\{!\cf4 \strokec4 canBuy\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  handleBuyEmotion\cf6 \strokec6 (\cf4 \strokec4 item\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             className\cf6 \strokec6 =\{\cf7 \strokec7 `px-6 py-2 rounded-full font-bold text-white shadow-md transition-all \cf6 \strokec6 $\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               canBuy \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-600 active:border-b-0'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                               \cf7 \strokec7 'bg-rose-300 cursor-not-allowed'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                             \cf10 \strokec10 \uc0\u36092 \u20837 \u12377 \u12427 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                           \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \})\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setGameState\cf6 \strokec6 (\cf7 \strokec7 'title'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\cf7 \strokec7 "px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all"\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf10 \strokec10 \uc0\u12479 \u12452 \u12488 \u12523 \u12408 \u25147 \u12427 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* === \uc0\u12503 \u12524 \u12452 \u30011 \u38754  === */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'playing'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex flex-col h-[500px] pt-16"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex justify-between items-end mb-4 border-b-2 border-orange-100 pb-4"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex items-center gap-6 md:gap-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-xs md:text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf5 \strokec5 SCORE\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-3xl md:text-5xl font-black text-orange-500 tabular-nums leading-none"\cf6 \strokec6 >\{\cf4 \strokec4 score\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-xs md:text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf5 \strokec5 COMBO\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\{\cf7 \strokec7 `text-2xl md:text-4xl font-black tabular-nums leading-none transition-colors duration-200 \cf6 \strokec6 $\{\cf4 \strokec4 combo \cf6 \strokec6 >\cf4 \strokec4  \cf9 \strokec9 10\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-rose-500'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-amber-700'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 \{\cf4 \strokec4 combo\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-right"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-xs md:text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf5 \strokec5 TIME\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\{\cf7 \strokec7 `text-4xl md:text-6xl font-black tabular-nums leading-none \cf6 \strokec6 $\{\cf4 \strokec4 timeLeft \cf6 \strokec6 <=\cf4 \strokec4  \cf9 \strokec9 10\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'text-rose-500 animate-pulse'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'text-orange-500'\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}>\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 \{\cf4 \strokec4 timeLeft\cf6 \strokec6 \}<\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-2xl text-amber-700"\cf6 \strokec6 >\cf4 \strokec4 s\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex-grow relative bg-orange-50/50 rounded-2xl overflow-hidden border-2 border-orange-100 shadow-inner"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\cf7 \strokec7 "absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-slate-700 border-y-8 border-slate-600 shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)]"\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 style\cf6 \strokec6 =\{\{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   backgroundImage\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.05) 38px, rgba(255,255,255,0.05) 40px)'\cf6 \strokec6 ,\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   animation\cf6 \strokec6 :\cf4 \strokec4  isConveyorOn \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'conveyor 1s linear infinite'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'none'\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 \}\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               />\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4               \cf6 \strokec6 \{\cf4 \strokec4 currentBread \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 div \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   key\cf6 \strokec6 =\{\cf4 \strokec4 animKey\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   className\cf6 \strokec6 =\{\cf7 \strokec7 `absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-10 \cf6 \strokec6 $\{!\cf4 \strokec4 isConveyorOn \cf6 \strokec6 ?\cf4 \strokec4  \cf7 \strokec7 'left-1/2 -translate-x-1/2'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 ''\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   style\cf6 \strokec6 =\{\cf4 \strokec4 isConveyorOn \cf6 \strokec6 ?\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     left\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '100%'\cf6 \strokec6 ,\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     animation\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 `flow \cf6 \strokec6 $\{\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 time \cf6 \strokec6 *\cf4 \strokec4  course\cf6 \strokec6 .\cf4 \strokec4 speed \cf6 \strokec6 *\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 activeEmotion \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'emotion_angry'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf9 \strokec9 0.6\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf9 \strokec9 1.0\cf6 \strokec6 )\}\cf7 \strokec7 s linear forwards`\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 \}\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 \{\}\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   onAnimationEnd\cf6 \strokec6 =\{\cf4 \strokec4 isConveyorOn \cf6 \strokec6 ?\cf4 \strokec4  handleMissWord \cf6 \strokec6 :\cf4 \strokec4  \cf2 \strokec2 undefined\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "relative mb-3"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u36092 \u20837 \u12539 \u35013 \u20633 \u12375 \u12383 \u12362 \u30399 \u12364 \u12371 \u12371 \u12395 \u21453 \u26144 \u12373 \u12428 \u12427  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\{\cf7 \strokec7 `absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 rounded-[100%] shadow-xl \cf6 \strokec6 $\{\cf4 \strokec4 activePlate\cf6 \strokec6 .\cf4 \strokec4 css\cf6 \strokec6 \}\cf7 \strokec7 `\cf6 \strokec6 \}\cf4 \strokec4 ></div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-7xl md:text-8xl drop-shadow-lg relative z-10 transition-transform hover:scale-110"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 \{\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 emoji\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border-2 border-orange-200 text-center whitespace-nowrap min-w-[200px]"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-lg md:text-xl font-bold text-amber-900 mb-1"\cf6 \strokec6 >\{\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}</\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-2xl md:text-4xl font-mono font-black tracking-widest"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-slate-300"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 romaji\cf6 \strokec6 .\cf4 \strokec4 substring\cf6 \strokec6 (\cf9 \strokec9 0\cf6 \strokec6 ,\cf4 \strokec4  currentBread\cf6 \strokec6 .\cf4 \strokec4 typedCount\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-orange-500 border-b-4 border-orange-500 pb-1"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 romaji\cf6 \strokec6 .\cf4 \strokec4 substring\cf6 \strokec6 (\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 typedCount\cf6 \strokec6 ,\cf4 \strokec4  currentBread\cf6 \strokec6 .\cf4 \strokec4 typedCount \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-amber-800"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                         \cf6 \strokec6 \{\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 word\cf6 \strokec6 .\cf4 \strokec4 romaji\cf6 \strokec6 .\cf4 \strokec4 substring\cf6 \strokec6 (\cf4 \strokec4 currentBread\cf6 \strokec6 .\cf4 \strokec4 typedCount \cf6 \strokec6 +\cf4 \strokec4  \cf9 \strokec9 1\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                       \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                   \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf8 \strokec8 /* === \uc0\u12522 \u12470 \u12523 \u12488 \u30011 \u38754  === */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 \{\cf4 \strokec4 gameState \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'result'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 (\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "text-center pt-24 pb-12"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf7 \strokec7 "text-4xl font-black text-amber-800 mb-2"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u12479 \u12452 \u12512 \u12450 \u12483 \u12503 \u65281 \u55358 \u56662 \cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-xl font-bold text-orange-600 mb-4"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u12467 \u12540 \u12473 \cf6 \strokec6 :\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4 course\cf6 \strokec6 .\cf4 \strokec4 name\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 \{\cf8 \strokec8 /* \uc0\u29554 \u24471 \u12467 \u12452 \u12531 \u12398 \u34920 \u31034  */\cf6 \strokec6 \}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "inline-block bg-yellow-100 border-2 border-yellow-400 px-6 py-2 rounded-full mb-8 animate-bounce shadow-md"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-lg font-black text-yellow-700"\cf4 \strokec4 >+\cf6 \strokec6 \{\cf4 \strokec4 score\cf6 \strokec6 \}\cf4 \strokec4  \cf10 \strokec10 \uc0\u12467 \u12452 \u12531 \u29554 \u24471 \u65281 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-orange-50 p-4 rounded-xl border-2 border-orange-100 col-span-2 md:col-span-1"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u26368 \u32066 \u12473 \u12467 \u12450 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-4xl font-black text-orange-500"\cf6 \strokec6 >\{\cf4 \strokec4 score\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-orange-50 p-4 rounded-xl border-2 border-orange-100"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u29554 \u24471 \u12497 \u12531 \u25968 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-3xl font-black text-amber-700"\cf6 \strokec6 >\{\cf4 \strokec4 clearedBreads\cf6 \strokec6 \}\cf4 \strokec4  \cf10 \strokec10 \uc0\u20491 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-orange-50 p-4 rounded-xl border-2 border-orange-100"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u26368 \u22823 \u12467 \u12531 \u12508 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-3xl font-black text-amber-700"\cf6 \strokec6 >\{\cf4 \strokec4 maxCombo\cf6 \strokec6 \}</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-orange-50 p-4 rounded-xl border-2 border-orange-100"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u27491 \u35299 \u12479 \u12452 \u12503 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-2xl font-black text-amber-700"\cf6 \strokec6 >\{\cf4 \strokec4 totalTyped\cf6 \strokec6 \}\cf4 \strokec4  \cf10 \strokec10 \uc0\u22238 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "bg-orange-50 p-4 rounded-xl border-2 border-orange-100"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-sm text-amber-600 font-bold"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u27491 \u35299 \u29575 \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf7 \strokec7 "text-2xl font-black text-amber-700"\cf6 \strokec6 >\{\cf4 \strokec4 accuracy\cf6 \strokec6 \}\cf4 \strokec4  %</p\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4             \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "flex flex-wrap justify-center gap-4"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setGameState\cf6 \strokec6 (\cf7 \strokec7 'title'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\cf7 \strokec7 "px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all"\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf10 \strokec10 \uc0\u12479 \u12452 \u12488 \u12523 \u12408 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 <\cf4 \strokec4 button\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 onClick\cf6 \strokec6 =\{()\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  setGameState\cf6 \strokec6 (\cf7 \strokec7 'shop'\cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 className\cf6 \strokec6 =\cf7 \strokec7 "px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black text-xl rounded-full shadow-lg border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4                 \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf7 \strokec7 "text-2xl"\cf6 \strokec6 >\cf10 \strokec10 \uc0\u55357 \u57042 \cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4  \cf10 \strokec10 \uc0\u12471 \u12519 \u12483 \u12503 \u12408 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4               \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4             \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4           \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf6 \strokec6 )\}\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\
\cf4 \cb3 \strokec4       \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf7 \strokec7 "mt-8 text-amber-700/60 font-medium text-sm"\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4         \cf5 \strokec5 PC\cf10 \strokec10 \uc0\u12398 \u12461 \u12540 \u12508 \u12540 \u12489 \u23554 \u29992 \u12466 \u12540 \u12512 \u12391 \u12377 \cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4       \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4     \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \cb1 \strokec4 \
\cf4 \cb3 \strokec4   \cf6 \strokec6 );\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 \}\cf4 \cb1 \strokec4 \
}