const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>Daring Fireball</title>
<subtitle>By John Gruber</subtitle>
<link rel="alternate" type="text/html" href="https://daringfireball.net/" />
<link rel="self" type="application/atom+xml" href="https://daringfireball.net/feeds/main" />
<id>https://daringfireball.net/feeds/main</id>


<updated>2021-08-07T22:22:32Z</updated><rights>Copyright © 2021, John Gruber</rights><entry>
    
    <link rel="alternate" type="text/html" href="https://daringfireball.net/2021/08/apple_child_safety_initiatives_slippery_slope" />
	<link rel="shorturl" href="http://df4.us/tl1" />
	<id>tag:daringfireball.net,2021://1.38341</id>
	<published>2021-08-07T02:12:45Z</published>
	<updated>2021-08-07T22:22:32Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<summary type="text">The stakes are incredibly high, and Apple knows it. Whatever you think of Apple’s decision to implement these features, they’re not doing so lightly.</summary>
	<content type="html" xml:base="https://daringfireball.net/" xml:lang="en"><![CDATA[
<p><a href="https://www.apple.com/child-safety/">Apple yesterday announced three new “Child Safety” initiatives</a>:</p>

<blockquote>
  <p>First, new communication tools will enable parents to play a more
informed role in helping their children navigate communication
online. The Messages app will use on-device machine learning to
warn about sensitive content, while keeping private communications
unreadable by Apple.</p>

<p>Next, iOS and iPadOS will use new applications of cryptography
to help limit the spread of CSAM online, while designing for
user privacy. CSAM detection will help Apple provide valuable
information to law enforcement on collections of CSAM in
iCloud Photos.</p>

<p>Finally, updates to Siri and Search provide parents and children
expanded information and help if they encounter unsafe situations.
Siri and Search will also intervene when users try to search for
CSAM-related topics.</p>
</blockquote>

<p>(CSAM stands for <a href="https://www.inhope.org/EN/articles/child-sexual-abuse-material">Child Sexual Abuse Material</a> — a.k.a. child pornography. People familiar with the lingo seem to pronounce it <em>see-sam</em>. Another acronym to know: NCMEC — <em>nick-meck</em> — the <a href="https://www.missingkids.org/">National Center for Missing and Exploited Children</a>. That’s the nonprofit organization, founded and funded by the U.S. government, that maintains the database of known CSAM.)</p>

<p>The third initiative — updates to Siri and Search — is the easiest to understand and, I think, uncontroversial. The first two, however, seem not well-understood, and are, justifiably, receiving intense scrutiny from privacy advocates.</p>

<p>My first advice is to read <a href="https://www.apple.com/child-safety/">Apple’s own high-level description of the features</a>, which ends with links to detailed technical documentation regarding the encryption and techniques Apple is employing in the implementations, and “technical assessments” from three leading researchers in cryptography and computer vision.</p>

<p>The Messages feature is specifically only for children in a shared iCloud family account. If you’re an adult, nothing is changing with regard to any photos you send or receive through Messages. And if you’re a parent with children whom the feature <em>could</em> apply to, you’ll need to explicitly opt in to enable the feature. It will not turn on automatically when your devices are updated to iOS 15. If a child sends or receives (and chooses to view) an image that triggers a warning, the notification is sent from the child’s device to the parents’ devices — Apple itself is not notified, nor is law enforcement. These parental notifications are only for children 12 or younger in a family iCloud account; parents do not have the option of receiving notifications for teenagers, although teenagers can receive the content warnings on their devices.</p>

<p>It’s also worth pointing out that it’s a feature of the Messages <em>app</em>, not the iMessage <em>service</em>. For one thing, this means it applies to images sent or received via SMS, not just iMessage. But more importantly, it changes nothing about the end-to-end encryption inherent to the iMessage protocol. The image processing to detect sexually explicit images happens before (for sending) or after (for receiving) the endpoints. It seems like a good feature with few downsides. (<a href="https://www.eff.org/deeplinks/2021/08/apples-plan-think-different-about-encryption-opens-backdoor-your-private-life">The EFF disagrees</a>.)</p>

<p>The CSAM detection for iCloud Photo Library is more complicated, delicate, and controversial. But it only applies to images being sent to iCloud Photo Library. If you don’t use iCloud Photo Library, no images on your devices are fingerprinted. But, of course, most of us <em>do</em> use iCloud Photo Library.</p>

<p>I mentioned above that Apple’s “Child Safety” page for these new features has links to technical assessments from outside experts. In particular, I thought <a href="https://www.apple.com/child-safety/pdf/Technical_Assessment_of_CSAM_Detection_Benny_Pinkas.pdf">the description of Apple’s CSAM detection from Benny Pinkas</a> — a cryptography researcher at Bar-Ilan University in Israel — was instructive:</p>

<blockquote>
  <p>My research in cryptography has spanned more than 25 years. I
initiated the applied research on privacy preserving computation,
an area of cryptography that makes it possible for multiple
participants to run computations while concealing their private
inputs. In particular, I pioneered research on private set
intersection (PSI).</p>

<p>The Apple PSI system solves a very challenging problem of
detecting photos with CSAM content while keeping the contents of
all non-CSAM photos encrypted and private. Photos are only
analyzed on users’ devices. Each photo is accompanied by a safety
voucher that includes information about the photo, protected by
two layers of encryption. This information includes a NeuralHash
and a visual derivative of the photo. Only if the Apple cloud
identifies that a user is trying to upload a significant number of
photos with CSAM content, the information associated with these
specific photos can be opened by the cloud. If a user uploads less
than a predefined threshold number of photos containing CSAM
content then the information associated with all of photos of this
user is kept encrypted, even if some of these photos contain CSAM
content. It is important to note that no information about non-CSAM
content can be revealed by the Apple PSI system. […]</p>

<p>The design is accompanied by security proofs that I have evaluated
and confirmed.</p>
</blockquote>

<p>For obvious reasons, this feature is <em>not</em> optional. If you use iCloud Photo Library, the images in your library will go through this fingerprinting. (This includes the images already in your iCloud Photo Library, not just newly-uploaded images after the feature ships later this year.) To opt out of this fingerprint matching, you’ll need to disable iCloud Photo Library.</p>

<p>A big source of confusion seems to be what <em>fingerprinting</em> entails. Fingerprinting is not content analysis. It’s not determining <em>what</em> is in a photo. It’s just a way of assigning unique identifiers — essentially long numbers — to photos, in a way that will generate the same fingerprint identifier if the same image is cropped, resized, or even changed from color to grayscale. It’s not a way of determining whether two photos (the user’s local photo, and an image in the CSAM database from NCMEC) are of the same subject — it’s a way of determining whether they are two versions of the <em>same image</em>. If I take a photo of, say, my car, and you take a photo of my car, the images should not produce the same fingerprint even though they’re photos of the same car in the same location. And, in the same way that real-world fingerprints can’t be backwards engineered to determine what the person they belong to looks like, these fingerprints cannot be backwards engineered to determine anything at all about the subject matter of the photographs.</p>

<p>The Messages features for children in iCloud family accounts <em>is</em> doing content analysis to try to identify sexually explicit photos, but is <em>not</em> checking image fingerprint hashes against the database of CSAM fingerprints.</p>

<p>The CSAM detection for images uploaded to iCloud Photo Library is <em>not</em> doing content analysis, and is only checking fingerprint hashes against the database of known CSAM fingerprints. So, to name one common innocent example, if you have photos of your kids in the bathtub, or otherwise frolicking in a state of undress, no content analysis is performed that tries to detect that, hey, this is a picture of an undressed child. Fingerprints from images of similar content are not themselves similar. Two photographs of the same subject should produce entirely dissimilar fingerprints. The fingerprints of your own photos of your kids are no more likely to match the fingerprint of an image in NCMEC’s CSAM database than is a photo of a sunset or a fish.</p>

<p>The database will be part of iOS 15, and is a database of fingerprints, <em>not</em> images. Apple does not have the images in NCMEC’s library of known CSAM, and in fact <em>cannot</em> — NCMEC is the only organization in the U.S. that is legally permitted to possess these photos.</p>

<p>If you don’t use iCloud Photo Library, none of this applies to you. If you do use iCloud Photo Library, this detection is only applied to the images in your photo library that are synced to iCloud.</p>

<p>Furthermore, one match isn’t enough to trigger any action. There’s a “threshold” — some number of matches against the CSAM database — that must be met. Apple isn’t saying what this threshold number is, but, for the sake of argument, let’s say that threshold is 10. With 10 or fewer matches, nothing happens, and nothing <em>can</em> happen on Apple’s end. Only after 11 matches (threshold + 1) will Apple be alerted. Even then, someone at Apple will investigate, by examining the contents of the <em>safety vouchers</em> that will accompany each photo in iCloud Photo Library. These vouchers are encrypted such that they can only be decrypted on the server side if threshold + 1 matches have been identified. From <a href="https://www.apple.com/child-safety/">Apple’s own description</a>:</p>

<blockquote>
  <p>Using another technology called threshold secret sharing, the
system ensures the contents of the safety vouchers cannot be
interpreted by Apple unless the iCloud Photos account crosses a
threshold of known CSAM content. The threshold is set to provide
an extremely high level of accuracy and ensures less than a one in
one trillion chance per year of incorrectly flagging a given
account.</p>
</blockquote>

<p>Even if your account is — against those one in a trillion odds, if Apple’s math is correct — <em>incorrectly</em> flagged for exceeding the threshold, someone at Apple will examine the contents of the safety vouchers for those flagged images before reporting the incident to law enforcement. Apple is cryptographically only able to examine the safety vouchers for those images whose fingerprints matched items in the CSAM database. The vouchers include a “visual derivative” of the image — basically a low-res version of the image. If innocent photos are somehow wrongly flagged, Apple’s reviewers should notice.</p>

<hr />

<p>All of these features are fairly grouped together under a “child safety” umbrella, but I can’t help but wonder if it was a mistake to announce them together. Many people are clearly conflating them, including those reporting on the initiative for the news media. E.g. The Washington Post’s “<em>never met an Apple story that couldn’t be painted in the worst possible light</em>” <a href="https://www.washingtonpost.com/technology/2021/08/05/apple-child-pornography-iphone/">Reed Albergotti’s report</a>, the first three paragraphs of which are simply wrong<sup id="fnr1-2021-08-06"><a href="#fn1-2021-08-06">1</a></sup> and the headline for which is grossly misleading (“Apple Is Prying Into iPhones to Find Sexual Predators, but Privacy Activists Worry Governments Could Weaponize the Feature”).</p>

<p>It’s also worth noting that fingerprint hash matching against NCMEC’s database is already happening on other major cloud hosting services and social networks. <a href="https://www.nytimes.com/2021/08/05/technology/apple-iphones-privacy.html">From The New York Times’s report on Apple’s initiative</a>:</p>

<blockquote>
  <p>U.S. law requires tech companies to flag cases of child sexual
abuse to the authorities. Apple has historically flagged fewer
cases than other companies. Last year, for instance, Apple
reported 265 cases to the National Center for Missing &amp;
Exploited Children, while Facebook reported 20.3 million,
according to the center’s statistics. That enormous gap is due
in part to Apple’s decision not to scan for such material,
citing the privacy of its users.</p>
</blockquote>

<p>The difference going forward is that Apple will be matching fingerprints against NCMEC’s database client-side, not server-side. But I suspect others will follow suit, including Facebook and Google, with client-side fingerprint matching for end-to-end encrypted services. There is no way to perform this matching server-side with any E2EE service — between the sender and receiver endpoints, the server has no way to decrypt the images with end-to-end encryption.</p>

<p>Which in turn makes me wonder if Apple sees this initiative as a necessary first step toward providing end-to-end encryption for iCloud Photo Library and iCloud device backups. <a href="https://support.apple.com/en-us/HT202303">Apple has long encrypted all iCloud data that can be encrypted</a>,<sup id="fnr2-2021-08-06"><a href="#fn2-2021-08-06">2</a></sup> both in transit and on server, but device backups, photos, and iCloud Drive are among the things that are not <em>end-to-end</em> encrypted. Apple has the keys to decrypt them, and can be compelled to do so by law enforcement.</p>

<p>In January 2020, <a href="https://www.reuters.com/article/us-apple-fbi-icloud-exclusive-idUSKBN1ZK1CT">Reuters reported that Apple in 2018 dropped plans to use end-to-end encryption for iCloud backups at the behest of the FBI</a>:</p>

<blockquote>
  <p>Apple Inc. dropped plans to let iPhone users fully encrypt
backups of their devices in the company’s iCloud service after the
FBI complained that the move would harm investigations, six
sources familiar with the matter told Reuters.</p>

<p>The tech giant’s reversal, about two years ago, has not previously
been reported. It shows how much Apple has been willing to help
U.S. law enforcement and intelligence agencies, despite taking a
harder line in high-profile legal disputes with the government and
casting itself as a defender of its customers’ information.</p>
</blockquote>

<p>Whether Reuters’s report that Apple caved to FBI pressure on E2EE iCloud backups is accurate or not, I don’t know, but I do know that privacy advocates (including myself) would love to see Apple enable E2EE for <em>everything</em> in iCloud, and that law enforcement agencies around the world would not. This fingerprint matching for CSAM could pave the way for a middle ground, if Apple unveils end-to-end encryption for iCloud photos and backups in the future. In such a scenario, Apple would have no cryptographic ability to turn your backups or entire photo library over to anyone, but they would be able to flag and report iCloud accounts whose photo libraries exceed the threshold for CSAM database fingerprint matches, including the “visual derivatives” of the matching photos — all without Apple ever seeing or being able to see your original photos on iCloud.</p>

<p>It’s also possible Apple has simply permanently shelved plans to use end-to-end encryption for all iCloud data. No surprise: they’re not saying. But it feels very plausible to me that Apple views this privacy-protecting CSAM detection as a necessary first step to broadening the use of end-to-end encryption.</p>

<hr />

<p>In short, if these features work as described and <em>only</em> as described, there’s almost no cause for concern. In an interview with The New York Times for <a href="https://www.nytimes.com/2021/08/05/technology/apple-iphones-privacy.html">its aforelinked report on this initiative</a>, Erik Neuenschwander, Apple’s chief privacy engineer, said, “If you’re storing a collection of CSAM material, yes, this is bad for you. But for the rest of you, this is no different.” By all accounts, that is fair and true.</p>

<p>But the “if” in “if these features work as described and <em>only</em> as described” is the rub. That “if” is the whole ballgame. If you discard alarmism from critics of this initiative who clearly do not understand how the features work, you’re still left with completely legitimate concerns from trustworthy experts about how the features could be abused or misused in the future.</p>

<p>What happens, for example, if China demands that it provide its own database of image fingerprints for use with this system — a database that would likely include images related to political dissent. <a href="https://www.bbc.com/news/av/world-asia-48476879">Tank man</a>, say, or any of the remarkable litany of comparisons <a href="https://www.google.com/search?tbm=isch&amp;q=xi+jinping+looks+like+winnie+the+pooh">showing the striking resemblance of Xi Jinping to Winnie the Pooh</a>.</p>

<p>This slippery-slope argument is a legitimate concern. Apple’s response is simply that they’ll refuse. Again, from <a href="https://www.nytimes.com/2021/08/05/technology/apple-iphones-privacy.html">Jack Nicas’s report for The Times</a>:</p>

<blockquote>
  <p>Mr. Green said he worried that such a system could be abused
because it showed law enforcement and governments that Apple now
had a way to flag certain content on a phone while maintaining its
encryption. Apple has previously argued to the authorities that
encryption prevents it from retrieving certain data.</p>

<p>“What happens when other governments ask Apple to use this for
other purposes?” Mr. Green asked. “What’s Apple going to say?”</p>

<p>Mr. Neuenschwander dismissed those concerns, saying that
safeguards are in place to prevent abuse of the system and that
Apple would reject any such demands from a government.</p>

<p>“We will inform them that we did not build the thing they’re
thinking of,” he said.</p>
</blockquote>

<p>Will Apple actually flatly refuse any and all such demands? If they do, it’s all good. If they don’t, and these features creep into surveillance for things like political dissent, copyright infringement, LGBT imagery, or adult pornography — anything at all beyond irrefutable CSAM — it’ll prove disastrous to Apple’s reputation for privacy protection. <a href="https://www.eff.org/deeplinks/2021/08/apples-plan-think-different-about-encryption-opens-backdoor-your-private-life">The EFF seems to see such slipping down the slope as inevitable</a>.</p>

<p>We shall see. The stakes are incredibly high, and Apple knows it. Whatever you think of Apple’s decision to implement these features, they’re not doing so lightly.</p>

<div class="footnotes">
<hr />
<ol>
<li id="fn1-2021-08-06">
<p><p>Albergotti’s opening, verbatim:</p>

<blockquote>
  <p>Apple unveiled a sweeping new set of software tools Thursday that
will scan iPhones and other devices for child pornography and text
messages with explicit content and report users suspected of
storing illegal pictures on their phones to authorities.</p>
</blockquote>

<p>Wrong. The only photos that might be reported to authorities are those being sent to iCloud. “Scanned” is a misleading verb. And the entire “text messages” feature is only for children in shared iCloud family accounts. Albergotti’s alarmist lead makes it sound like all content for all users in Messages will be “scanned”, whereas in fact nothing sent to or from an adult user in Messages will ever be “scanned” — unless an image is saved from Messages to Photos and iCloud Photo Library is enabled.</p>

<blockquote>
  <p>The aggressive plan to thwart child predators and pedophiles and
prohibit them from utilizing Apple’s services for illegal activity
pitted the tech giant against civil liberties activists and
appeared to contradict some of its own long-held assertions about
privacy and the way the company interacts with law enforcement.</p>
</blockquote>

<p>As announced, none of these features contradict any of Apple’s “long-held assertions”.</p>

<blockquote>
  <p>The move also raises new questions about the nature of smartphones
and who really owns the computers in their pockets. The new
software will perform scans on its users’ devices without their
knowledge or explicit consent, and potentially put innocent users
in legal jeopardy.</p>
</blockquote>

<p>None of this raises any questions about who owns your iPhone. It does assert that Apple owns iCloud’s servers, but no images on an iPhone that isn’t syncing to iCloud Photo Library will ever be fingerprinted. The Messages content warnings for children are explicitly opt in, as is syncing to iCloud Photo Library. Unless Apple’s cryptographic math is catastrophically wrong, it is exceedingly unlikely that innocent users’ photos will ever be flagged, and even if they are flagged for exceeding the threshold for CSAM fingerprint matches, there’s a manual review by Apple before anything is reported to law enforcement.</p>

<p>It’s hard to imagine a three-paragraph lede that is more histrionically misleading than Albergotti’s in this report.</p>&nbsp;<a href="#fnr1-2021-08-06"  class="footnoteBackLink"  title="Jump back to footnote 1 in the text.">&#x21A9;&#xFE0E;</a></p>
</li>

<li id="fn2-2021-08-06">
<p>The exception is IMAP email, which is encrypted in transit between client and server but is not stored encrypted on the server, because that’s how IMAP was designed. Long story short, email is probably the least secure messaging service you use. If you wouldn’t put it on paper and send via postal mail, don’t send it via email.&nbsp;<a href="#fnr2-2021-08-06"  class="footnoteBackLink"  title="Jump back to footnote 2 in the text.">&#x21A9;&#xFE0E;︎</a></p>
</li>

</ol>
</div>



    ]]></content>
  <title>★ Apple’s New ‘Child Safety’ Initiatives, and the Slippery Slope</title></entry><entry>
	<title>CNN Fires Three Employees for Going Into Office Without Vaccinations</title>
	<link rel="alternate" type="text/html" href="https://deadline.com/2021/08/cnn-fires-employees-vaccinations-covid-1234810040/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tl0" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/05/cnn-fires-three-unvaccinated-employees" />
	<id>tag:daringfireball.net,2021:/linked//6.38340</id>
	<published>2021-08-05T21:57:23Z</published>
	<updated>2021-08-05T21:57:23Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Ted Johnson, reporting for Deadline:</p>

<blockquote>
  <p>CNN head Jeff Zucker said that the network has fired three
employees for going into the office without being vaccinated
against Covid-19, and that parent WarnerMedia may ultimately
require proof of the shots. […]</p>

<p>“In the past week, we have been made aware of three employees who
were coming to the office unvaccinated,” Zucker wrote in an email
to staff. “All three have been terminated. Let me be clear — we
have a zero-tolerance policy on this. You need to be vaccinated to
come to the office. And you need to be vaccinated to work in the
field, with other employees, regardless of whether you enter an
office or not. Period. We expect that in the weeks ahead, showing
proof of vaccination may become a formal part of the WarnerMedia
Passcard process. Regardless, our expectations remain in place.”</p>
</blockquote>

<p>More like this, please.</p>

<div>
<a  title="Permanent link to ‘CNN Fires Three Employees for Going Into Office Without Vaccinations’"  href="https://daringfireball.net/linked/2021/08/05/cnn-fires-three-unvaccinated-employees">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>The Case for Requiring Vaccinations for Domestic Flights</title>
	<link rel="alternate" type="text/html" href="https://www.theatlantic.com/ideas/archive/2021/08/unvaccinated-flight-vaccine-tsa-mandate/619643/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkz" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/05/kayyem-vaccinations-for-air-travel" />
	<id>tag:daringfireball.net,2021:/linked//6.38339</id>
	<published>2021-08-05T16:41:07Z</published>
	<updated>2021-08-05T16:45:42Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Juliette Kayyem, assistant secretary for homeland security under President Obama, writing for The Atlantic:</p>

<blockquote>
  <p>The White House has <a href="https://twitter.com/Yamiche/status/1422281785719857152?s=20">rejected a nationwide vaccine mandate</a>—a sweeping suggestion that the Biden administration could not easily enact if it wanted to—but a no-fly list for unvaccinated adults is an obvious step that the federal government should take. It will help limit the risk of transmission at destinations where unvaccinated people travel—and, by setting norms that restrict certain privileges to vaccinated people, will also help raise the stagnant vaccination rates that are keeping both the economy and society from fully recovering.</p>

<p>Flying is not a right, and the case for restricting it to vaccinated people is straightforward: The federal government is the sole entity that can regulate the terms and conditions of airline safety. And although air-filtration systems and mask requirements make transmission of the coronavirus unlikely during any given passenger flight, infected people can spread it when they leave the airport and take off their mask.</p>
</blockquote>

<div>
<a  title="Permanent link to ‘The Case for Requiring Vaccinations for Domestic Flights’"  href="https://daringfireball.net/linked/2021/08/05/kayyem-vaccinations-for-air-travel">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Jim Cramer Explains the ‘Metaverse’ and What It Means for Facebook</title>
	<link rel="alternate" type="text/html" href="https://www.cnbc.com/video/2021/07/29/jim-cramer-explains-the-metaverse-and-what-it-means-for-facebook.html" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tky" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/04/cramerverse" />
	<id>tag:daringfireball.net,2021:/linked//6.38338</id>
	<published>2021-08-04T16:42:36Z</published>
	<updated>2021-08-04T16:46:00Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Sure, OK, that makes a lot of sense.</p>

<div>
<a  title="Permanent link to ‘Jim Cramer Explains the ‘Metaverse’ and What It Means for Facebook’"  href="https://daringfireball.net/linked/2021/08/04/cramerverse">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Google Teases Upcoming Pixel 6 and 6 Pro Phones</title>
	<link rel="alternate" type="text/html" href="https://www.theverge.com/2021/8/2/22605094/google-pixel-6-pro-tensor-processor-specs-ai-ml" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkx" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/03/pixel-6-teaser" />
	<id>tag:daringfireball.net,2021:/linked//6.38337</id>
	<published>2021-08-03T18:36:34Z</published>
	<updated>2021-08-04T23:34:45Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Dieter Bohn, writing for The Verge:</p>

<blockquote>
  <p>Tensor is an SoC, not a single processor. And so while it’s fair
to call it Google-designed, it’s also still unclear which
components are Google-made and which are licensed from others. Two
things are definitely coming from Google: a mobile TPU for AI
operations and a new Titan M2 chip for security. The rest,
including the CPU, GPU, and 5G modem, are all still a mystery.</p>

<p>Less mysterious: the phones themselves. I spent about an hour at
Google’s Mountain View campus last week looking at the phone
hardware and talking with Google’s hardware chief Rick Osterloh
about Tensor. After all that, my main takeaway about the new Pixel
6 phones is simple.</p>

<p>Google is actually, finally trying to make a competitive
flagship phone.</p>
</blockquote>

<p>“This is the year Google gets serious about Pixel (née Nexus) phones” is right up there with “the next version of Bluetooth is going to be reliable” and “this is the year of desktop Linux” on the list of perennial letdowns. But like Charlie Brown trying to kick Lucy’s football, hope springs eternal, and I’m hopeful Google actually pulls it off this time. The iPhone needs better rivals.</p>

<div>
<a  title="Permanent link to ‘Google Teases Upcoming Pixel 6 and 6 Pro Phones’"  href="https://daringfireball.net/linked/2021/08/03/pixel-6-teaser">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Emojipedia Acquired by Zedge</title>
	<link rel="alternate" type="text/html" href="https://blog.emojipedia.org/emojipedia-joins-zedge/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkw" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/03/emojipedia-acquired-by-zedge-" />
	<id>tag:daringfireball.net,2021:/linked//6.38336</id>
	<published>2021-08-03T14:45:18Z</published>
	<updated>2021-08-03T14:47:43Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>🤔</p>

<div>
<a  title="Permanent link to ‘Emojipedia Acquired by Zedge’"  href="https://daringfireball.net/linked/2021/08/03/emojipedia-acquired-by-zedge-">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Follow the Islamic State on Gettr</title>
	<link rel="alternate" type="text/html" href="https://www.politico.com/news/2021/08/02/trump-gettr-social-media-isis-502078" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tku" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/03/gettr-while-the-gettring-is-good" />
	<id>tag:daringfireball.net,2021:/linked//6.38334</id>
	<published>2021-08-03T14:09:31Z</published>
	<updated>2021-08-03T14:28:37Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Mark Scott and Tina Nguyen, reporting for Politico:</p>

<blockquote>
  <p>Just weeks after its launch, the pro-Trump social network GETTR is inundated with terrorist propaganda spread by supporters of Islamic State, according to a POLITICO review of online activity on the fledgling platform.</p>

<p>The social network — started a month ago by members of former President Donald Trump’s inner circle — features reams of jihadi-related material, including graphic videos of beheadings, viral memes that promote violence against the West and even memes of a militant executing Trump in an orange jumpsuit similar to those used in Guantanamo Bay.</p>
</blockquote>

<div>
<a  title="Permanent link to ‘Follow the Islamic State on Gettr’"  href="https://daringfireball.net/linked/2021/08/03/gettr-while-the-gettring-is-good">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	
	<link rel="alternate" type="text/html" href="https://tara.ai/?ref=daringfireball" />
	<link rel="shorturl" href="http://df4.us/tkv" />
	<link rel="related" type="text/html" href="https://daringfireball.net/feeds/sponsors/2021/08/tara_ai_build_better_software" />
	<id>tag:daringfireball.net,2021:/feeds/sponsors//11.38335</id>
	<author><name>Daring Fireball Department of Commerce</name></author>
	<published>2021-08-03T08:52:33-05:00</published>
	<updated>2021-08-03T10:29:39-05:00</updated>
	<content type="html" xml:base="https://daringfireball.net/feeds/sponsors/" xml:lang="en"><![CDATA[
<p>We all want to build great software — as quickly as possible. Here are three blockers we often hear from developers:</p>

<ul>
<li><p><em>Getting everyone aligned</em></p>

<p>Get ideas across clearly with a clear problem statement and requirements. Use a tool like Tara to get sign-off before you start.</p></li>
<li><p><em>Visibility into actual progress</em></p>

<p>Code changes are the best indicators of progress. Use tools that enable transparency. With Tara, everyone can see commits, blocks, and merges for a sense of true progress.</p></li>
<li><p><em>Manual status updates</em></p>

<p>Manual updates are the achilles heel of every project. Use tools that automate tedious, low-value actions — like Tara’s auto-status that marks tasks as done when a PR merges.</p></li>
</ul>

<p>One workspace for your team’s docs, sprints, and tasks synced to code. Plus an API for custom workflows. <a href="https://tara.ai/?ref=daringfireball">Get started on Tara for free</a>.</p>

<div>
<a  title="Permanent link to ‘Tara AI — Build Better Software, Faster’"  href="https://daringfireball.net/feeds/sponsors/2021/08/tara_ai_build_better_software">&nbsp;★&nbsp;</a>
</div>

	]]></content>
	<title>[Sponsor] Tara AI — Build Better Software, Faster</title></entry><entry>
	<title>‘The Costs of Selling COVID Fear’</title>
	<link rel="alternate" type="text/html" href="https://surowiecki.medium.com/the-costs-of-selling-covid-fear-a9f5600e0fde" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkt" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/02/surowiecki-covid-fear" />
	<id>tag:daringfireball.net,2021:/linked//6.38333</id>
	<published>2021-08-02T12:56:48Z</published>
	<updated>2021-08-02T13:01:27Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>James Surowiecki:</p>

<blockquote>
  <p>When the CDC changed its guidance on masking earlier this week — recommending, among other things, that even vaccinated people start wearing masks in indoor public spaces in areas of substantial to high Covid transmission — it cited “unpublished data” as a reason for its decision. The next day, <a href="https://www.washingtonpost.com/context/cdc-breakthrough-infections/94390e3a-5e45-44a5-ac40-2744e4e25f2e/?_=1">the internal CDC document</a> that seems to have prompted the shift was published — by the Washington Post. And when major news media got a look at, the message they sent vaccinated people was pretty simple: “Panic!”</p>

<p>This reaction was not justified by the actual data in the CDC document.</p>
</blockquote>

<p>Headlines matter, and the headlines for these stories have been grossly misleading.</p>

<div>
<a  title="Permanent link to ‘‘The Costs of Selling COVID Fear’’"  href="https://daringfireball.net/linked/2021/08/02/surowiecki-covid-fear">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Brief Reviews of (Nearly) Every Mac Keyboard</title>
	<link rel="alternate" type="text/html" href="https://www.dgriffinjones.com/extraordinary/brief-reviews-of-nearly-every-mac-keyboard.html" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tks" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/02/every-mac-keyboard" />
	<id>tag:daringfireball.net,2021:/linked//6.38332</id>
	<published>2021-08-02T12:29:19Z</published>
	<updated>2021-08-02T12:32:11Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Griffin Jones:</p>

<blockquote>
  <p>The <a href="https://deskthority.net/wiki/AppleDesign_Keyboard">AppleDesign Keyboard</a> is a cheap cost-cutting imitation of the Extended Keyboard. It doesn’t even have an embedded Apple logo, just its silhouette punched into the mold of plastic. The symbolism that Apple was only a shadow of its former self in the mid-90s could not be any clearer.</p>

<p>I rate it 2⁄5 stars.</p>
</blockquote>

<p>Spot-on reviews.</p>

<div>
<a  title="Permanent link to ‘Brief Reviews of (Nearly) Every Mac Keyboard’"  href="https://daringfireball.net/linked/2021/08/02/every-mac-keyboard">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>GitFinder</title>
	<link rel="alternate" type="text/html" href="https://gitfinder.com/?df=yes" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkr" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/01/gitfinder" />
	<id>tag:daringfireball.net,2021:/linked//6.38331</id>
	<published>2021-08-01T14:40:50Z</published>
	<updated>2021-08-01T17:35:53Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>My thanks to GitFinder for sponsoring last week at DF. GitFinder integrates Git directly in the Finder on MacOS. Features include:</p>

<ul>
<li>See Git status of files directly in Finder with descriptive icon badges.</li>
<li>Perform Git operations directly in Finder using customizable contextual and toolbar item menus.</li>
<li>Enjoy the full Git experience — merge, rebase, stash, resolve, reset, revert, cherrypick, export, patch, compare, pull requests, and more — accessible directly in Finder.</li>
<li>Do everything using your mouse, clicking on buttons and using contextual menus.</li>
<li>Or, do everything using your keyboard, with fully-customizable key shortcuts.</li>
</ul>

<p>All this and much more in a fast, lightweight, securely-sandboxed and beautiful Git client. GitFinder is exactly the sort of thoughtfully-designed developer tool that makes the Mac the Mac.</p>

<div>
<a  title="Permanent link to ‘GitFinder’"  href="https://daringfireball.net/linked/2021/08/01/gitfinder">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Shawn King: ‘Be Wary of the “iPhone Photography Awards”’</title>
	<link rel="alternate" type="text/html" href="https://www.loopinsight.com/2020/07/22/be-wary-of-the-iphone-photography-awards/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkq" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/08/01/king-ippawards" />
	<id>tag:daringfireball.net,2021:/linked//6.38330</id>
	<published>2021-08-01T14:20:51Z</published>
	<updated>2021-08-02T15:27:45Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Shawn King, writing for The Loop regarding <em>last year’s</em> iPhone Photography Awards:</p>

<blockquote>
  <p>But I remember having my spidey senses tingle last year with these
awards so I did some digging into it. The first thing I noticed
was you have to “pay to play” — that is, it costs $5.50 to submit
a single image with “discounts” given for multiple image
submissions. Paying to submit images to a contest is not
necessarily a bad thing but it always raises concerns for me.</p>

<p>Next up was the judges — or lack thereof. In an <a href="https://www.inputmag.com/culture/2020-iphone-photography-awards-winning-photos-heres-how-they-were-shot-judged">interview
with Input</a>, the founder of the IPPAWARDS Kenan Aktulun
(whose <a href="https://twitter.com/keakt">Twitter account</a> is protected) wouldn’t say who the
judges were:</p>

<blockquote>
  <p>I asked Aktulun to share some details behind the curtains about
the judging process. Though he wouldn’t say specifically who the
panel of judges was for the 2020 winners, he said they were made
up of a diverse cast of visual storytellers including
photographers and designers.</p>
</blockquote>

<p>That’s always a red flag for me. Every reputable photo
competition, from Apple on down, lists the names of the people
doing the judging.</p>
</blockquote>

<p>The prizes are sort of shitty too.</p>

<div>
<a  title="Permanent link to ‘Shawn King: ‘Be Wary of the “iPhone Photography Awards”’’"  href="https://daringfireball.net/linked/2021/08/01/king-ippawards">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Rolling Stone: ‘How Dommes Are Convincing Submissives to Get Jabs’</title>
	<link rel="alternate" type="text/html" href="https://www.rollingstone.com/culture/culture-features/bdsm-dommes-subs-vaccination-covid19-1201121/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkp" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/31/rolling-stone-dommes" />
	<id>tag:daringfireball.net,2021:/linked//6.38329</id>
	<published>2021-07-31T14:28:47Z</published>
	<updated>2021-07-31T14:33:02Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>E.J. Dickson, reporting for Rolling Stone:</p>

<blockquote>
  <p>“I think I had the same reservations that many people had,” Bob, who requested that his last name be withheld to protect his privacy, tells Rolling Stone.</p>

<p>Then Bob saw a tweet from Goddess Alexandra Snow, a professional dominatrix and dungeon owner who operates Wicked Eden, a BDSM collective based in Columbus, Ohio. The tweet stated that any submissives who wanted to session with Snow in person would have to show proof of vaccination. Bob had been subscribing to Goddess Snow’s OnlyFans and “tributing” her (giving her money) for almost two years, and he got in touch with her to discuss whether or not he should get the vaccine. “It was less about convincing me and more about her confirming to me that it was the right thing to do,” he says. He got his final shot three weeks ago. “It [feels] good to know that I’m (hopefully) contributing to others not falling seriously ill,” he says. “And of course, it’s gratifying to know I’ve done something that Goddess Snow approves of.”</p>
</blockquote>

<p>More like this, please.</p>

<div>
<a  title="Permanent link to ‘Rolling Stone: ‘How Dommes Are Convincing Submissives to Get Jabs’’"  href="https://daringfireball.net/linked/2021/07/31/rolling-stone-dommes">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>The Talk Show: ‘You Called Him Pixel Mature’</title>
	<link rel="alternate" type="text/html" href="https://daringfireball.net/thetalkshow/2021/07/30/ep-319" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tko" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/30/the-talk-show-319" />
	<id>tag:daringfireball.net,2021:/linked//6.38328</id>
	<published>2021-07-30T21:05:21Z</published>
	<updated>2021-07-30T21:05:21Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Special guest: John Moltz. Special topics: Playdate preorders, MagSafe battery packs, iPad keyboard covers, Facebook and NSO Group, Safari 15 betas, and <em>Loki</em>.</p>

<p>Brought to you by:</p>

<ul>
<li><a href="https://linkedin.com/talk">LinkedIn Jobs</a>: Find and hire the right person. Your first job post is free.</li>
<li><a href="https://awaytravel.com/talkshow">Away</a>: Because this season, everyone wants to get Away.</li>
<li><a href="https://squarespace.com/talkshow">Squarespace</a>: Everything you need to grow online. Use code <strong>talkshow</strong> for 10% off your first order.</li>
<li><a href="https://linode.com/thetalkshow">Linode</a>: Instantly deploy and manage an SSD server in the Linode Cloud. New accounts get a $100 credit.</li>
<li><a href="https://mackweldon.com/talkshow">Mack Weldon</a>: Reinventing men’s basics with smart design, premium fabrics, and simple shopping. Get 20% off your first order with code <strong>talkshow</strong>.</li>
</ul>

<div>
<a  title="Permanent link to ‘The Talk Show: ‘You Called Him Pixel Mature’’"  href="https://daringfireball.net/linked/2021/07/30/the-talk-show-319">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Children’s Hospital of Philadelphia to Mandate COVID-19 Vaccination for Employees</title>
	<link rel="alternate" type="text/html" href="https://www.inquirer.com/health/coronavirus/chop-vaccine-requirement-coronavirus-20210729.html" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkn" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/29/chop-mandate" />
	<id>tag:daringfireball.net,2021:/linked//6.38327</id>
	<published>2021-07-29T22:04:11Z</published>
	<updated>2021-07-29T22:07:19Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Aubrey Whelan, reporting for The Philadelphia Inquirer:</p>

<blockquote>
  <p>The Children’s Hospital of Philadelphia will soon require all its on-site employees to be vaccinated against the coronavirus, as most of their patients are too young to receive the COVID-19 vaccine. The hospital did not specify a deadline for employees to receive the vaccine, but said in a statement Thursday that it is “currently preparing for the implementation of a vaccine requirement.”</p>

<p>“We believe that it is our duty to protect those who cannot protect themselves, especially our young patients,” the statement read.</p>
</blockquote>

<p>More like this, please.</p>

<div>
<a  title="Permanent link to ‘Children’s Hospital of Philadelphia to Mandate COVID-19 Vaccination for Employees’"  href="https://daringfireball.net/linked/2021/07/29/chop-mandate">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Mandate Vaccinations, Not Masks</title>
	<link rel="alternate" type="text/html" href="https://www.nytimes.com/2021/07/27/opinion/covid-vaccine-delta-variant.html" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkm" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/29/carroll-mandate-vaccinations" />
	<id>tag:daringfireball.net,2021:/linked//6.38326</id>
	<published>2021-07-29T18:20:29Z</published>
	<updated>2021-07-29T18:38:20Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Aaron E. Carroll, chief health officer for Indiana University, in a guest column for The New York Times:</p>

<blockquote>
  <p>Many may read the C.D.C.’s continued focus on masking and
distancing as an acknowledgment that the vaccines don’t work well
enough. Leaning heavily on masking and distancing is what we did
when we didn’t have vaccinations. Today, such recommendations are
less likely to succeed because they are more likely to be followed
by those already primed to listen — the vaccinated — and to be
fought and ignored by those who aren’t.</p>

<p>Hospitalizations and deaths are rising in some areas not because
someone didn’t wear a mask at the ballgame. They’re occurring
because too many people are not immunized.</p>

<p>This is why I’ve <a href="https://www.nytimes.com/2021/06/28/opinion/covid-vaccine-mandate.html">advocated</a> vaccine mandates. I don’t understand
how we can mandate wearing masks but not getting vaccinations.</p>
</blockquote>

<p>Here’s German Lopez, <a href="https://www.vox.com/2021/7/28/22594637/vaccine-mandates-covid-19-masks-delta-variants">making the same case at Vox</a>:</p>

<blockquote>
  <p>A year ago, requiring masks as cases spiked would have been an
obviously smart decision. Mask mandates <a href="https://www.vox.com/science-and-health/21546014/mask-mandates-coronavirus-covid-19">work</a>, and for most of
2020, they were among the best methods we had to stop the spread
of Covid-19. But masks were never meant to be the long-term
solution; they were a stopgap until the US and the rest of the
world could stamp out epidemics through vaccination.</p>

<p>Now those vaccines are here. And the changed circumstances of
summer 2021 call for new approaches. Any entity thinking about a
mask requirement — from private businesses to local, state, and
federal governments — should consider mandating something else
first: vaccination.</p>
</blockquote>

<p>Asking the vaccinated to wear masks to protect the voluntarily unvaccinated is not going to work. <a href="https://www.theatlantic.com/ideas/archive/2021/07/vaccinated-america-breaking-point-anti-vaxxers/619539/">The backlash is growing</a>.</p>

<div>
<a  title="Permanent link to ‘Mandate Vaccinations, Not Masks’"  href="https://daringfireball.net/linked/2021/07/29/carroll-mandate-vaccinations">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Google and Facebook to Require Employees Get Vaccinated</title>
	<link rel="alternate" type="text/html" href="https://www.washingtonpost.com/technology/2021/07/28/google-office-vaccinate/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkl" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/29/google-facebook-employee-vaccinations" />
	<id>tag:daringfireball.net,2021:/linked//6.38325</id>
	<published>2021-07-29T18:09:59Z</published>
	<updated>2021-07-29T18:10:00Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Heather Kelly and Gerrit De Vynck, reporting for The Washington Post:</p>

<blockquote>
  <p>Google on Wednesday became the first Big Tech [<em>sic</em>] company to
announce that it will require employees who work in its offices to
be fully vaccinated. Facebook later announced a similar policy
requiring all in-person workers to get vaccinated before coming
into a Facebook office in the United States.</p>
</blockquote>

<p>More like this, please (<em>ahem</em>, Apple).</p>

<div>
<a  title="Permanent link to ‘Google and Facebook to Require Employees Get Vaccinated’"  href="https://daringfireball.net/linked/2021/07/29/google-facebook-employee-vaccinations">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Danny Meyer’s Restaurants Will Require Both Employees and Patrons to Be Vaccinated</title>
	<link rel="alternate" type="text/html" href="https://twitter.com/SquawkCNBC/status/1420704924644610051" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkk" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/29/meyer-vaccination-requirement" />
	<id>tag:daringfireball.net,2021:/linked//6.38324</id>
	<published>2021-07-29T18:06:59Z</published>
	<updated>2021-07-29T18:21:16Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Shake Shack founder Danny Meyer, appearing on CNBC’s Squawk Box:</p>

<blockquote>
  <p>“We’re following the lead of both city, state, and federal
government. We’re going to do this ourselves in our restaurants in
New York City and in Washington D.C. … We feel like we have an
amazing responsibility to keep our staff members and our guests
safe, and that’s what we’re going to do.”</p>
</blockquote>

<p>More like this, please.</p>

<div>
<a  title="Permanent link to ‘Danny Meyer’s Restaurants Will Require Both Employees and Patrons to Be Vaccinated’"  href="https://daringfireball.net/linked/2021/07/29/meyer-vaccination-requirement">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Remember When Facebook Wanted to Use NSO Group’s Spyware to Surveil iOS Users?</title>
	<link rel="alternate" type="text/html" href="https://daringfireball.net/linked/2020/04/04/facebook-nso-group" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkj" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/29/facebook-nso-group" />
	<id>tag:daringfireball.net,2021:/linked//6.38323</id>
	<published>2021-07-29T14:21:45Z</published>
	<updated>2021-07-29T14:27:08Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>One angle I didn’t see resurface amidst <a href="https://www.amnesty.org/en/latest/research/2021/07/forensic-methodology-report-how-to-catch-nso-groups-pegasus/">all the attention this month on NSO Group’s Pegasus spyware</a> that exploits iOS — last year Motherboard reporter Joseph Cox revealed that Facebook attempted to purchase the right to use Pegasus to spy on their own iOS users. That seemed really fucked-up then, and even more fucked-up now.</p>

<div>
<a  title="Permanent link to ‘Remember When Facebook Wanted to Use NSO Group’s Spyware to Surveil iOS Users?’"  href="https://daringfireball.net/linked/2021/07/29/facebook-nso-group">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Mitch McConnell Is Going to Run Ads Urging Kentuckians to Get Vaccinated</title>
	<link rel="alternate" type="text/html" href="https://www.reuters.com/world/us/mcconnell-strives-counter-bad-advice-boost-us-republican-vaccination-rate-2021-07-28/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tki" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/28/mcconnell-vaccination-ads" />
	<id>tag:daringfireball.net,2021:/linked//6.38322</id>
	<published>2021-07-28T21:42:01Z</published>
	<updated>2021-07-28T22:31:32Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>David Morgan, reporting for Reuters:</p>

<blockquote>
  <p>“Not enough people are vaccinated,” said McConnell, a polio survivor. “So we’re trying to get them to reconsider and get back on the path to get us to some level of herd immunity.”</p>

<p>McConnell, who was vaccinated for COVID-19 in December and has been promoting vaccinations in public remarks ever since, plans to run 60-second radio ads on more than 100 Kentucky radio stations in the coming days promoting the vaccine with money from his re-election campaign.</p>
</blockquote>

<p>More like this, please.</p>

<div>
<a  title="Permanent link to ‘Mitch McConnell Is Going to Run Ads Urging Kentuckians to Get Vaccinated’"  href="https://daringfireball.net/linked/2021/07/28/mcconnell-vaccination-ads">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Charles Barkley: Sports Leagues ‘Should Force Guys to Get Vaccinated’</title>
	<link rel="alternate" type="text/html" href="https://www.cnbc.com/2021/07/27/charles-barkley-sports-leagues-should-force-guys-to-get-vaccinated.html" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkh" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/28/barkley" />
	<id>tag:daringfireball.net,2021:/linked//6.38321</id>
	<published>2021-07-28T18:06:32Z</published>
	<updated>2021-07-28T18:06:32Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Jade Scipioni, reporting for CNBC:</p>

<blockquote>
  <p>“Yes, I’m vaccinated,” says NBA legend Charles Barkley. “Everybody
should be vaccinated. Period.”</p>

<p>“The only people who are not vaccinated are just assholes,”
he says.</p>

<p>The 58-year-old NBA Hall-of-Famer says he personally thinks sports
leagues should force players to get vaccinated. “Can you imagine
if one of these guys that are not vaccinated, if they get one of
these players’ kids, wives, girlfriends, moms and dads sick and
they die over some unnecessary conspiracy bullshit,” Barkley says.
“I think that would be tragic.”</p>
</blockquote>

<p>More like this, please. (<a href="https://onefoottsunami.com/2021/07/28/sir-charles-does-not-mince-words/">Via Paul Kafasis</a>.)</p>

<div>
<a  title="Permanent link to ‘Charles Barkley: Sports Leagues ‘Should Force Guys to Get Vaccinated’’"  href="https://daringfireball.net/linked/2021/07/28/barkley">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Techdirt Is Now Entirely Without Any Google Ads or Tracking Code</title>
	<link rel="alternate" type="text/html" href="https://www.techdirt.com/articles/20210726/09441047251/techdirt-is-now-entirely-without-any-google-ads-tracking-code.shtml" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkg" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/28/techdirt-google-free" />
	<id>tag:daringfireball.net,2021:/linked//6.38320</id>
	<published>2021-07-28T15:31:41Z</published>
	<updated>2021-07-28T15:35:51Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Mike Masnick:</p>

<blockquote>
  <p>Techdirt is one of the very, very, very few truly independent media brands around. Almost none of the independent media brands that existed when we started remain. Some have been sucked up into larger companies or shut down entirely. Others have decided to go behind expensive paywalls. We’ve had to adapt and change over the years in many ways just to stick around, but in the end the reason we do this is because of the community we’ve built up here. For us to stick around, I need to ask the community to help support us as well. We have some cool experiments and projects in the works, so stay tuned for that, but in the meantime, if you can help us out, it would be hugely appreciated.</p>
</blockquote>

<p>Techdirt is irreplaceable. There’s no other site like it. And indeed, indie websites that neither run crappy ads nor put their content behind a paywall are a dying breed. You go to an article at Techdirt and you see the article. No annoying popovers begging you to subscribe to a newsletter. You just see the article.</p>

<div>
<a  title="Permanent link to ‘Techdirt Is Now Entirely Without Any Google Ads or Tracking Code’"  href="https://daringfireball.net/linked/2021/07/28/techdirt-google-free">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Apple Reports Record Third Quarter Results</title>
	<link rel="alternate" type="text/html" href="https://www.apple.com/newsroom/2021/07/apple-reports-third-quarter-results/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkf" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/apple-q3-2021-results" />
	<id>tag:daringfireball.net,2021:/linked//6.38319</id>
	<published>2021-07-28T02:32:03Z</published>
	<updated>2021-07-28T02:32:04Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Apple Newsroom:</p>

<blockquote>
  <p>Apple today announced financial results for its fiscal 2021 third
quarter ended June 26, 2021. The Company posted a June quarter
record revenue of $81.4 billion, up 36 percent year over year, and
quarterly earnings per diluted share of $1.30.</p>
</blockquote>

<p>Jason Snell, as usual, <a href="https://sixcolors.com/post/2021/07/apple-posts-81b-quarterly-results-charts/">has charts</a>. Long story short: very strong quarter across the entire company.</p>

<div>
<a  title="Permanent link to ‘Apple Reports Record Third Quarter Results’"  href="https://daringfireball.net/linked/2021/07/27/apple-q3-2021-results">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>As Promised, Safari for iPadOS 15 Beta 4 Has a Standalone Tab Bar, Like the Mac Version</title>
	<link rel="alternate" type="text/html" href="https://www.macrumors.com/2021/07/27/ipados-15-macos-monterey-safari-interface/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tke" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/safari-15-for-ipados" />
	<id>tag:daringfireball.net,2021:/linked//6.38318</id>
	<published>2021-07-28T02:25:54Z</published>
	<updated>2021-07-28T02:25:55Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Juli Clover, MacRumors:</p>

<blockquote>
  <p>Prior to this beta, Safari on iPad was similar to Safari on iOS
with no dedicated tab bar, but after the update, Apple has added a
dedicated tab bar that’s activated by default, which is the same
layout that’s now used in macOS Monterey.</p>

<p>While the separate tab bar is enabled automatically when updating,
in the Safari section of Settings, there is an option to toggle on
the original compact tab bar that merged everything together.</p>
</blockquote>

<p>This is a significant improvement for Safari on iPad, and showing the tab bar is the correct default. If you love the new unified design, it’s still there. But my big problem with this tab bar — both on Mac and now iPad — is that it’s very hard to see which tab is the current (selected) tab. The visual indication for “selected” is just a very slightly different background tint — whether you’ve got “Show color in tab bar” enabled or not. You can even scroll the current tab out of view. Why is that possible? I don’t see how this is better than the Safari 14 tab bar in any way, and I see a lot of ways that it’s worse.</p>

<div>
<a  title="Permanent link to ‘As Promised, Safari for iPadOS 15 Beta 4 Has a Standalone Tab Bar, Like the Mac Version’"  href="https://daringfireball.net/linked/2021/07/27/safari-15-for-ipados">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Safari’s Crowded Toolbar in iOS 15 Beta 4</title>
	<link rel="alternate" type="text/html" href="https://twitter.com/viticci/status/1420084637926363136" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkd" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/safari-15b4-toolbar-viticci" />
	<id>tag:daringfireball.net,2021:/linked//6.38317</id>
	<published>2021-07-28T01:58:20Z</published>
	<updated>2021-07-28T01:58:54Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Federico Viticci, on Twitter:</p>

<blockquote>
  <p>There’s a total of <em>six</em> different touch targets in the iOS 15
beta 4 tab bar in Safari.</p>

<p>These exclude the ability to long-press the tab bar, swipe across
it to change tabs, and swipe it up to open the Tabs view.</p>

<p>I’m … starting to think a single, small toolbar just won’t do. 😬</p>
</blockquote>

<p><a href="https://twitter.com/gruber/status/1420134055799033859">I responded</a> that there are actually <em>nine</em> tap targets in the new toolbar in beta 4 — Viticci didn’t count the left / right edges that can be tapped like buttons to switch to the previous / next tabs. That’s nine tappable buttons (or effective buttons) on a single phone-width toolbar. (My tweet says eight, but there are two separate tappable areas to bring up the URL address bar, one on each side of the minuscule reload button.)</p>

<p><a href="https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/">Apple’s own example in the HIG</a> of a toolbar that’s too crowded has … <a href="https://twitter.com/samthegeek/status/1420157962350366722">nine items</a>.</p>

<p><a href="https://twitter.com/parrots/status/1420086381204934665">Curtis Herbert</a>:</p>

<blockquote>
  <p>I really do appreciate the experimentation, but the new Safari
feels like something I’d take to the UI Design Labs at WWDC and
they’d push me to use native controls that users expect and
already know, have better tap targets, and stop cramming too many
things in a small space.</p>
</blockquote>

<div>
<a  title="Permanent link to ‘Safari’s Crowded Toolbar in iOS 15 Beta 4’"  href="https://daringfireball.net/linked/2021/07/27/safari-15b4-toolbar-viticci">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Safari UI Changes in iOS 15 Beta 4</title>
	<link rel="alternate" type="text/html" href="https://www.macrumors.com/2021/07/27/everything-new-in-ios-15-beta-4/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkc" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/ios-15b4-safari-changes" />
	<id>tag:daringfireball.net,2021:/linked//6.38316</id>
	<published>2021-07-28T01:44:25Z</published>
	<updated>2021-07-28T01:44:26Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>On iPhone:</p>

<ul>
<li><p>The Share button is back in the toolbar, replacing the “···” don’t-call-it-a-hamburger-button. But there’s an awful lot of non-sharing stuff crammed into the Share menu — the ᴀA menu items from the current version of Safari (text size, Reader mode, disabling content blockers temporarily, etc.) are all in “Share” now. It’s better than the “···” menu in betas 1–3, but really, this is more like changing the “···” glyph to the Share glyph. It’s still two menus’ worth of features stuffed into one monolithic menu.</p></li>
<li><p>The Reload button is back. But it’s bizarrely tiny — way smaller than the minimum recommended tap target size of 44 x 44 points. And it shares space with the newly restored Reader mode button. When you load a page, if Reader mode is available, the Reader mode button shows briefly (maybe for 1–2 seconds?) along with the text “Reader Available” under the website’s domain name. But then the “Reader Available” label fades out and the Reader mode button turns into the Reload button. To enable Reader mode at this point, you either need to long-press the URL domain name to bring up a shortcut menu, or tap the — you guessed it — Share button, which has its own “Reader” item near the top.</p></li>
<li><p>Bookmarks are supposed to be easier to access, but I think most users accustomed to previous versions of Mobile Safari — which heretofore has always had a bookmarks button right in the main toolbar — are going to struggle to find them.</p></li>
</ul>

<p>Apple is clearly trying to address the <a href="https://daringfireball.net/2021/07/safari_15_public_betas_for_mac_and_ios">numerous complaints</a> about the Safari 15 design for iPhone, but beta 4 feels like they’ve decided that the solution to finding themselves in a hole is to dig faster.</p>

<div>
<a  title="Permanent link to ‘Safari UI Changes in iOS 15 Beta 4’"  href="https://daringfireball.net/linked/2021/07/27/ios-15b4-safari-changes">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>WSJ Investigation Into How TikTok’s Algorithm Figures Out Your Interests</title>
	<link rel="alternate" type="text/html" href="https://www.wsj.com/video/series/inside-tiktoks-highly-secretive-algorithm/investigation-how-tiktok-algorithm-figures-out-your-deepest-desires/6C0C2040-FF25-4827-8528-2BD6612E3796" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tkb" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/wsj-tiktok" />
	<id>tag:daringfireball.net,2021:/linked//6.38315</id>
	<published>2021-07-28T01:15:05Z</published>
	<updated>2021-07-28T15:14:03Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Fascinating video from The Wall Street Journal:</p>

<blockquote>
  <p>A Wall Street Journal investigation found that TikTok only needs
one important piece of information to figure out what you want:
the amount of time you linger over a piece of content. Every
second you hesitate or rewatch, the app is tracking you.</p>
</blockquote>

<p>Not surprising it works this way, but creepy nonetheless. <strong>Update:</strong> I’ve long suspected that Instagram does something similar, with regard to its often uncanny “<em>Hey, I was just looking at pictures of those…</em>” ads.</p>

<div>
<a  title="Permanent link to ‘WSJ Investigation Into How TikTok’s Algorithm Figures Out Your Interests’"  href="https://daringfireball.net/linked/2021/07/27/wsj-tiktok">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Brief Grief</title>
	<link rel="alternate" type="text/html" href="https://brief.news/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tka" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/twitter-acquires-brief" />
	<id>tag:daringfireball.net,2021:/linked//6.38314</id>
	<published>2021-07-27T20:59:51Z</published>
	<updated>2021-07-28T04:03:53Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Nick Hobbs and Andrea Huey:</p>

<blockquote>
  <p>We’re excited to announce that Brief is joining Twitter! Our team has always been inspired by Twitter’s mission to improve public conversation, and we can’t wait to work with the kind, brilliant folks we’ve met there. Together, we’ll do great things. Sadly, this transition also means that our work at Brief is coming to an end. The newsroom will publish our final news bulletins on July 31. […]</p>

<p>We founded this company to foster healthy discourse by rethinking the way we read the news. The only way we can tackle the world’s complex challenges is by doing it together. In this next chapter, we’ll continue our efforts to push the conversation forward, and we hope that everyone who believed in us will do the same.</p>
</blockquote>

<p>Ugh.</p>

<p>Congrats to Hobbs and Huey (presuming this is a good outcome for them), but man, this is the second iOS app from my <em>first</em> home screen that Twitter has acquired and killed in the last few months. (The other was <a href="https://daringfireball.net/linked/2021/05/05/nuzzel">Nuzzel</a>, which shut down in May, and which I continue to miss every day.)</p>

<p>Brief is an extraordinary app. It cost $5-6/month (it varied over the time I was using it), and you got about 5 major news stories a day. Each story was short — a neat summary with links to sources for more information if you wanted more. That’s it. It was like reading the front page of a good newspaper. Brief didn’t tell you everything — it told you the most important news, and that’s it. No needless notifications, and most importantly, no infinite scroll. Brief wasn’t designed or edited to keep you in Brief for as long as it could. Quite the opposite: Brief was designed and edited to get you in, get you up to date on major national and world news, and get you <em>out</em>. Brief is the only news app I’m aware of that gave you a sense of completeness — the point was to catch up, quickly, and be done. No ads. Just a fair subscription price (that I would have happily paid much more for.) For god’s sake Brief defaulted to <em>not</em> sending you any notifications at all. No notifications. They just assumed you’d open Brief when you wanted to see if there was fresh news. When’s the last time you saw a news app that defaulted to not trying to send you notifications, let alone not bombarding you with them?</p>

<p>Even the company’s name — Broadsheet — harkened back to the days of print newspapers and their <em>finiteness</em>. When you finish reading Section A of The New York Times, you’re done. You can stop, without worrying that you’re missing anything. Brief is like that, except just 5 or so stories per day.</p>

<p>Also, Brief is a beautiful app, designed specifically for iOS. It has a better and more iOS-like design and interaction model than Apple’s own News app. I don’t say this lightly, but its design was nearly perfect. I don’t know what Twitter plans to do with it, but given that Brief was pretty much the opposite of Twitter, experience-wise, I’m deeply pessimistic. Twitter’s apps have non-native designs and all try to keep you “engaged” for as long as possible.</p>

<p>I want more apps with a <em>finite</em> scroll, which respect, rather than seek to consume, my time and attention.</p>

<div>
<a  title="Permanent link to ‘Brief Grief’"  href="https://daringfireball.net/linked/2021/07/27/twitter-acquires-brief">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>MacOS 12 Monterey Beta 4 Now Supports Live Text on Intel Macs</title>
	<link rel="alternate" type="text/html" href="https://twitter.com/reneritchie/status/1420075589617209349" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk9" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/live-text-macos-12-intel-macs" />
	<id>tag:daringfireball.net,2021:/linked//6.38313</id>
	<published>2021-07-27T20:24:01Z</published>
	<updated>2021-07-27T20:28:50Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>When announced at WWDC last month, Live Text required Apple silicon on MacOS, because the implementation required the Neural Engine. Good news for everyone with an Intel Mac that Live Text is now slated to work on all Macs supported by MacOS 12.</p>

<div>
<a  title="Permanent link to ‘MacOS 12 Monterey Beta 4 Now Supports Live Text on Intel Macs’"  href="https://daringfireball.net/linked/2021/07/27/live-text-macos-12-intel-macs">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>JP Morgan Analysts Claim Apple to Use Titanium Alloy for iPhones Pro in 2022</title>
	<link rel="alternate" type="text/html" href="https://appleinsider.com/articles/21/07/26/iphone-14-pro-may-come-with-titanium-alloy-frame-or-enclosure-in-2022" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk8" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/titanium-iphones" />
	<id>tag:daringfireball.net,2021:/linked//6.38312</id>
	<published>2021-07-27T15:38:51Z</published>
	<updated>2021-07-27T17:22:54Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>William Gallagher, reporting for AppleInsider:</p>

<blockquote>
  <p>In a note to investors seen by AppleInsider, investment firm JP
Morgan Chase’s China office has reported to its clients that Apple
intends to introduce a titanium alloy to the iPhone for the first
time. Apple has already used titanium in some Apple Watch models,
for the physical Apple Card, and at times for the PowerBook.</p>

<p>Titanium’s toughness, though, is only achieved when it used as
part of a titanium alloy with other metals. Titanium is also prone
to smudges from fingerprints, and its finish can be unattractive.
Apple is therefore certain to be using an alloy, and it presumably
addresses these issues.</p>
</blockquote>

<p>I hope this is true. Stainless steel is just too heavy; titanium would be a much nicer premium upgrade over aluminum. The titanium Apple Watch models are great, especially the Space Black model with a highly scratch-resistant DLC finish.</p>

<div>
<a  title="Permanent link to ‘JP Morgan Analysts Claim Apple to Use Titanium Alloy for iPhones Pro in 2022’"  href="https://daringfireball.net/linked/2021/07/27/titanium-iphones">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>First Person Charged Under Hong Kong Security Law Found Guilty</title>
	<link rel="alternate" type="text/html" href="https://www.aljazeera.com/news/2021/7/27/first-person-charged-under-hong-kong-security-law-found-guilty" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk7" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/27/hong-kong-security-law" />
	<id>tag:daringfireball.net,2021:/linked//6.38311</id>
	<published>2021-07-27T15:28:13Z</published>
	<updated>2021-07-27T15:28:14Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Al Jazeera:</p>

<blockquote>
  <p>The first person charged under Hong Kong’s national security law
has been found guilty of “terrorism” and “inciting secession”, in
a landmark case with long-term implications for how the
legislation reshapes the city’s common law traditions.</p>

<p>Former waiter Tong Ying-kit, 24, was accused of driving his
motorcycle in July last year into three riot police officers while
carrying a flag with the protest slogan: “Liberate Hong Kong,
revolution of our times”, which prosecutors said was secessionist.</p>

<p>An alternative charge of dangerous driving causing grievous bodily
harm was not considered in Tuesday’s widely anticipated ruling,
much of which has hinged on the interpretation of the slogan. […]</p>

<p>The ruling imposes new limits on free speech in the former British
colony. Pro-democracy activists and human rights groups have also
criticised the decision to deny Tong bail and a jury trial, which
have been key features of Hong Kong’s rule of law.</p>
</blockquote>

<p>This is utterly unsurprising, but crushing nonetheless.</p>

<div>
<a  title="Permanent link to ‘First Person Charged Under Hong Kong Security Law Found Guilty’"  href="https://daringfireball.net/linked/2021/07/27/hong-kong-security-law">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Not Kidding About Those Blue Bubbles</title>
	<link rel="alternate" type="text/html" href="https://www.theringer.com/2021/7/21/22585355/giannis-antetokounmpo-book-excerpt-the-improbable-rise" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk5" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/26/kidd-bucks-blue-bubbles" />
	<id>tag:daringfireball.net,2021:/linked//6.38309</id>
	<published>2021-07-27T01:30:17Z</published>
	<updated>2021-07-27T01:30:17Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Mirin Fader, in an excerpt from her new book, <em><a href="https://amzn.to/3zGAVQ6">Giannis: The Improbable Rise of an NBA MVP</a></em>:</p>

<blockquote>
  <p>Knight searches for the right words. “I don’t want to sound
negative,” he says. Knight explains some of Kidd’s methods, such
as how Kidd would embarrass the culprit of an error by making
everyone but that person run sprints for his mistake. “He just had
his way of getting his point across,” Knight says.</p>

<p>Little things were made to be a big deal: At one point center Thon
Maker didn’t have an iPhone, messing up the team’s blue-bubble
iPhone group chat. Kidd was upset about it and made the team run
because Kidd felt that Maker not getting an iPhone was an example
of the team not being united.</p>
</blockquote>

<p>So now we know there’s a basketball court inside Apple’s walled garden.</p>

<div>
<a  title="Permanent link to ‘Not Kidding About Those Blue Bubbles’"  href="https://daringfireball.net/linked/2021/07/26/kidd-bucks-blue-bubbles">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>The History of Regular Expressions</title>
	<link rel="alternate" type="text/html" href="https://whyisthisinteresting.substack.com/p/the-regular-expression-edition" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk4" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/26/andersen-regex-history" />
	<id>tag:daringfireball.net,2021:/linked//6.38308</id>
	<published>2021-07-27T01:13:25Z</published>
	<updated>2021-07-27T01:13:26Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Buzz Andersen, in a guest post for Why Is This Interesting:</p>

<blockquote>
  <p>Eventually, a Russian artist and Twitter user named Gregory
Khodyrev <a href="https://twitter.com/GregoryKhodyrev/status/1369658173334884360">realized</a> what was going on: someone at Russia’s
state Internet censor, Roscomnadzor, had attempted to block the
Internet domain “t.co” (used by Twitter’s URL shortener), but had
instead managed to cut off access to <em>any</em> domain containing the
text pattern “t.co.” This meant that sites such as
“microsoft.com,” “reddit.com,” and even Russia’s own state media
outlet “rt.com” were rendered suddenly inaccessible.</p>

<p>Readers with a modicum of technical knowledge may already have an
inkling of what likely happened here: some hapless censor,
attempting to <a href="https://www.nytimes.com/2021/03/10/world/europe/russia-twitter.html">curb Twitter’s political influence</a>, installed a
URL pattern matching rule on Russia’s <a href="https://www.theguardian.com/technology/2019/apr/28/russia-great-firewall-sovereign-internet-bill-keeping-information-in-or-out">national firewall</a> that
turned out to have been just a tad overzealous. The rule in
question was almost certainly expressed using a notoriously
abstruse notation called a “regular expression.”</p>
</blockquote>

<div>
<a  title="Permanent link to ‘The History of Regular Expressions’"  href="https://daringfireball.net/linked/2021/07/26/andersen-regex-history">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>TextSniper</title>
	<link rel="alternate" type="text/html" href="https://textsniper.app/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk3" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/26/textsniper" />
	<id>tag:daringfireball.net,2021:/linked//6.38307</id>
	<published>2021-07-27T01:09:01Z</published>
	<updated>2021-07-27T01:09:01Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>OCR was a big part of WWDC last month, with the new Live Text feature. But a few of my friends turned me on to a Mac utility called TextSniper that’s offered instant OCR for any text on your screen for a while now. Very convenient, very accurate. I used it last week to turn <a href="https://twitter.com/oneunderscore__/status/1418016654580199427">this screenshot</a> — written by a Facebook user attempting to obfuscate many of the words with extra spaces — into text to include in <a href="https://daringfireball.net/linked/2021/07/22/facebook-anti-vaccine-codes">this post</a>, and TextSniper got it <em>exactly</em> right, weird spelling and spacing included. $10 in the App Store.</p>

<div>
<a  title="Permanent link to ‘TextSniper’"  href="https://daringfireball.net/linked/2021/07/26/textsniper">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	
	<link rel="alternate" type="text/html" href="https://gitfinder.com/?df=yes" />
	<link rel="shorturl" href="http://df4.us/tk6" />
	<link rel="related" type="text/html" href="https://daringfireball.net/feeds/sponsors/2021/07/gitfinder" />
	<id>tag:daringfireball.net,2021:/feeds/sponsors//11.38310</id>
	<author><name>Daring Fireball Department of Commerce</name></author>
	<published>2021-07-26T22:06:48-05:00</published>
	<updated>2021-07-26T22:06:49-05:00</updated>
	<content type="html" xml:base="https://daringfireball.net/feeds/sponsors/" xml:lang="en"><![CDATA[
<p>GitFinder brings a perfect integration of Git and Finder.</p>

<ul>
<li>See git status of files directly in Finder with descriptive icon badges</li>
<li>Perform git operations directly in Finder using customizable contextual and toolbar item menus</li>
<li>Enjoy the full git experience (merge, rebase, stash, resolve, reset, revert, cherrypick, export, patch, compare, pull requests…), accessible directly in Finder</li>
<li>Do everything using your mouse, clicking on buttons and numerous contextual menus</li>
<li>Do everything using your keyboard with fully-customizable key shortcuts</li>
</ul>

<p>All this and much more in a fast, lightweight, securely sandboxed and beautiful git client: GitFinder.</p>

<div>
<a  title="Permanent link to ‘GitFinder’"  href="https://daringfireball.net/feeds/sponsors/2021/07/gitfinder">&nbsp;★&nbsp;</a>
</div>

	]]></content>
	<title>[Sponsor] GitFinder</title></entry><entry>
	<title>Chrome Home — Abandoned Redesign of Mobile Chrome Circa 2016, With Goals Similar to Those of Mobile Safari 15</title>
	<link rel="alternate" type="text/html" href="https://read.cv/cleer/1R6eDCnOEDMDlRjMDbq8" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk2" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/26/chrome-home" />
	<id>tag:daringfireball.net,2021:/linked//6.38306</id>
	<published>2021-07-26T19:40:47Z</published>
	<updated>2021-07-26T21:21:56Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p><a href="https://twitter.com/cleerview/status/1419336516040544264">Chris Lee, on Twitter</a>:</p>

<blockquote>
  <p>I’ve been fascinated to watch the reaction to Safari in iOS 15 because in 2016-2017, I worked on a similar redesign for mobile Chrome that we never launched. Finally decided to tell a bit of that story here.</p>
</blockquote>

<p><a href="https://read.cv/cleer/1R6eDCnOEDMDlRjMDbq8">His story</a>:</p>

<blockquote>
  <p>I created the original concept and pitch for Chrome Home in 2016. It was based off two insights:</p>

<ol>
<li><p>Phones were growing in size, and we had opportunity to innovate in creating a gestural, spatial interface that would still be usable with one hand.</p></li>
<li><p>Mobile Chrome was also growing in features — but because its minimalist interface kept everything behind a “three dot” menu, these features were underutilized and hard to access.</p></li>
</ol>

<p>The idea caught traction internally, eventually becoming a Chrome org priority. […]</p>

<p>We heard a mixture of reactions. The feature gained a cult following among the tech community, but for many mainstream users, the change felt disorienting. Chrome serves billions of users around the globe with varying tech literacy. Over the course of many iterations, I became increasingly convinced that launching Chrome Home would not serve all our users well.</p>

<p>So just as I strongly as I had pitched the original concept, I advocated for us to stop the launch — which took not a small amount of debate.</p>
</blockquote>

<p>Really curious to see what the next betas of Safari look like on iOS and iPadOS. I spent all weekend with my spare phone running iOS 15 b3 and the new Safari design is not growing on me, at all.</p>

<div>
<a  title="Permanent link to ‘Chrome Home — Abandoned Redesign of Mobile Chrome Circa 2016, With Goals Similar to Those of Mobile Safari 15’"  href="https://daringfireball.net/linked/2021/07/26/chrome-home">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Toyota, Behind on Electric Cars, Lobbies Against Higher Fuel-Efficiency Standards</title>
	<link rel="alternate" type="text/html" href="https://www.nytimes.com/2021/07/25/climate/toyota-electric-hydrogen.html" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk1" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/26/toyota-electric-cars" />
	<id>tag:daringfireball.net,2021:/linked//6.38305</id>
	<published>2021-07-26T16:49:25Z</published>
	<updated>2021-07-26T16:54:37Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Hiroko Tabuchi, reporting for The New York Times:</p>

<blockquote>
  <p>Last month, Chris Reynolds, a senior executive who oversees government affairs for the company, traveled to Washington for closed-door meetings with congressional staff members and outlined Toyota’s opposition to an aggressive transition to all-electric cars. He argued that gas-electric hybrids like the Prius and hydrogen-powered cars should play a bigger role, according to four people familiar with the talks.</p>

<p>Behind that position is a business quandary: Even as other automakers have embraced electric cars, Toyota bet its future on the development of hydrogen fuel cells — a costlier technology that has fallen far behind electric batteries — with greater use of hybrids in the near term. That means a rapid shift from gasoline to electric on the roads could be devastating for the company’s market share and bottom line.</p>
</blockquote>

<p>This sounds like a once-great company that has lost its way. The real Toyota would lead the way to the future.</p>

<div>
<a  title="Permanent link to ‘Toyota, Behind on Electric Cars, Lobbies Against Higher Fuel-Efficiency Standards’"  href="https://daringfireball.net/linked/2021/07/26/toyota-electric-cars">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Flatfile Portal</title>
	<link rel="alternate" type="text/html" href="https://flatfile.com/product/portal/?utm_source=partner&amp;utm_medium=display&amp;utm_campaign=daring-fireball-sponsorship-display_q3-2021-portal-promotion-week-2&amp;utm_content=sponsored-ad&amp;utm_term=brandname#get-started" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tk0" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/24/flatfile-portal" />
	<id>tag:daringfireball.net,2021:/linked//6.38304</id>
	<published>2021-07-24T23:57:58Z</published>
	<updated>2021-07-25T21:24:38Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>My thanks to Flatfile for once again sponsoring DF. Importing critical B2B data shouldn’t require messy CSV templates or clunky data importers. Enable your users to import their own spreadsheet data, securely, and with confidence using Flatfile, the data onboarding platform.</p>

<p>No formatting Excel files for hours, no relying on complicated import scripts, and no burdening your engineers with building yet another custom data import solution.</p>

<p>Integrate an intuitive data onboarding experience with Flatfile, in minutes.</p>

<div>
<a  title="Permanent link to ‘Flatfile Portal’"  href="https://daringfireball.net/linked/2021/07/24/flatfile-portal">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Facebook Brings Cloud Games to iOS via Web App</title>
	<link rel="alternate" type="text/html" href="https://www.theverge.com/2021/7/23/22589398/facebook-cloud-gaming-web-app-launch-apple" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tjz" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/24/facebook-web-app-games" />
	<id>tag:daringfireball.net,2021:/linked//6.38303</id>
	<published>2021-07-24T16:51:06Z</published>
	<updated>2021-07-24T18:52:37Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Alex Heath, reporting for The Verge:</p>

<blockquote>
  <p>Starting Friday, Facebook is bringing its nascent cloud gaming service to iPhones and iPads <a href="https://www.fb.gg/play">through a web app</a> people will be able to add to their homescreens like a native app. The site will let you play simple web games like Solitaire and match-threes and stream more graphically intensive titles like racing games. […]</p>

<p>“We’ve come to the same conclusion as others: web apps are the only option for streaming cloud games on iOS at the moment,” Facebook’s vice president of gaming, Vivek Sharma, told The Verge in a statement. “As many have pointed out, Apple’s policy to ‘allow’ cloud games on the App Store doesn’t allow for much at all. Apple’s requirement for each cloud game to have its own page, go through review, and appear in search listings defeats the purpose of cloud gaming. These roadblocks mean players are prevented from discovering new games, playing cross-device, and accessing high-quality games instantly in native iOS apps — even for those who aren’t using the latest and most expensive devices.”</p>
</blockquote>

<p>There’s a lot to roll your eyes at in this brief statement, but the big one is the last clause, implying that Apple’s stance on cloud gaming has anything at all to do with pushing people to buy the “latest and most expensive devices”. Say what you want about Apple’s App Store policies, they go to great lengths to keep older devices relevant for as long as possible — including with their own library of Apple Arcade games.</p>

<p>Will be interesting to see if these web app games are actually good, and if so, actually become popular.</p>

<div>
<a  title="Permanent link to ‘Facebook Brings Cloud Games to iOS via Web App’"  href="https://daringfireball.net/linked/2021/07/24/facebook-web-app-games">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Winners of the 2021 iPhone Photography Awards</title>
	<link rel="alternate" type="text/html" href="https://www.ippawards.com/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tjy" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/23/ippawards-2021" />
	<id>tag:daringfireball.net,2021:/linked//6.38302</id>
	<published>2021-07-23T20:20:47Z</published>
	<updated>2021-08-01T14:23:00Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Inspiring work. Lot of winners using years-old iPhones, too.</p>

<p><strong>Update 1 August 2021:</strong> <a href="https://daringfireball.net/linked/2021/08/01/king-ippawards">Shawn King raises some good questions about this content</a>.</p>

<div>
<a  title="Permanent link to ‘Winners of the 2021 iPhone Photography Awards’"  href="https://daringfireball.net/linked/2021/07/23/ippawards-2021">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Iconfactory’s A.F.C. Richmond Wallpapers Are Now Free</title>
	<link rel="alternate" type="text/html" href="https://www.patreon.com/posts/42243134" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tjx" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/23/iconfactory-afc-richmond-wallpaper" />
	<id>tag:daringfireball.net,2021:/linked//6.38301</id>
	<published>2021-07-23T20:12:36Z</published>
	<updated>2021-07-23T20:12:37Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Nice way to celebrate today’s debut of season 2.</p>

<div>
<a  title="Permanent link to ‘Iconfactory’s A.F.C. Richmond Wallpapers Are Now Free’"  href="https://daringfireball.net/linked/2021/07/23/iconfactory-afc-richmond-wallpaper">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Playdate Preview</title>
	<link rel="alternate" type="text/html" href="https://arstechnica.com/gaming/2021/07/playdate-preview-you-wont-believe-how-fun-this-dorky-179-game-system-is/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tjw" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/23/playdate-preview" />
	<id>tag:daringfireball.net,2021:/linked//6.38300</id>
	<published>2021-07-23T17:34:44Z</published>
	<updated>2021-07-23T17:41:55Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>Sam Machkovech, writing for Ars Technica:</p>

<blockquote>
  <p>Sometimes, I want companies to lighten up and put the “fun” in
“functionality.”</p>

<p>That bias contributes in some part to my interest in the
<a href="http://play.date/">Playdate</a>, a $179 portable gaming system that errs on the
side of childish, low-powered fun. I’ve spent three weeks
testing the system’s “near-final” hardware ahead of preorders
opening up on 1 pm ET on Thursday, July 29, and I can confirm
that it’s indeed fun to look at. Luckily, it’s also fun, simple,
and accessible to hold, play with, and share with every friend
that I can.</p>
</blockquote>

<p>Andrew Webster at The Verge got an early look too, and <a href="https://www.theverge.com/22587172/playdate-hands-on-preview">had a similar reaction</a>. I can’t wait for it — Playdate looks like it’s going to be such fun.</p>

<div>
<a  title="Permanent link to ‘Playdate Preview’"  href="https://daringfireball.net/linked/2021/07/23/playdate-preview">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
	<title>Apple Will Continue Releasing Security Updates for iOS 14 After iOS 15 Ships This Fall</title>
	<link rel="alternate" type="text/html" href="https://techcrunch.com/2021/06/12/7-new-security-features-apple-quietly-announced-at-wwdc/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/tjv" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2021/07/23/ios-14-security-updates" />
	<id>tag:daringfireball.net,2021:/linked//6.38299</id>
	<published>2021-07-23T16:53:03Z</published>
	<updated>2021-08-03T12:47:21Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
<p>From a good roundup of security updates announced at WWDC last month, by Carly Page for TechCrunch:</p>

<blockquote>
  <p>To ensure iPhone users who don’t want to upgrade to iOS 15
straight away are up to date with security updates, Apple is going
to start decoupling patches from feature updates. When iOS 15
lands later this year, users will be given the option to update to
the latest version of iOS or to stick with iOS 14 and simply
install the latest security fixes.</p>

<p>“iOS now offers a choice between two software update versions in
the Settings app,” Apple explains (<a href="https://www.macrumors.com/2021/06/07/apple-wont-make-you-upgrade-to-ios-15/">via MacRumors</a>). “You can
update to the latest version of iOS 15 as soon as it’s released
for the latest features and most complete set of security updates.
Or continue on iOS 14 and still get important security updates
until you’re ready to upgrade to the next major version.”</p>
</blockquote>

<p>I missed this news last month, and misspoke about it on <a href="https://daringfireball.net/thetalkshow/2021/07/21/ep-318">the latest episode of my podcast</a>, while talking about holding onto iOS 14 indefinitely if Apple doesn’t sufficiently improve the design for Safari in iOS 15.</p>

<div>
<a  title="Permanent link to ‘Apple Will Continue Releasing Security Updates for iOS 14 After iOS 15 Ships This Fall’"  href="https://daringfireball.net/linked/2021/07/23/ios-14-security-updates">&nbsp;★&nbsp;</a>
</div>

	]]></content>
  </entry><entry>
    
    <link rel="alternate" type="text/html" href="https://daringfireball.net/2021/07/document_proxy_icons_macos_11_and_12" />
	<link rel="shorturl" href="http://df4.us/tjf" />
	<id>tag:daringfireball.net,2021://1.38283</id>
	<published>2021-07-20T01:54:00Z</published>
	<updated>2021-07-22T16:34:45Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<summary type="text">The Mac’s breakthrough was establishing an interface where you could see — and thus discover through visual exploration — not just what you *had* done, but what you *could* do.</summary>
	<content type="html" xml:base="https://daringfireball.net/" xml:lang="en"><![CDATA[
<p>“<a href="https://daringfireball.net/linked/2021/07/19/kirvin-safari-15-defense">You should only see a button when you need it</a>” seems to explain many of Apple’s recent UI directions. File proxy icons in MacOS document windows, for example, disappeared last year in MacOS 11 Big Sur — or rather, were hidden until you moused over them. <a href="https://mjtsai.com/blog/2020/10/05/big-surs-hidden-document-proxy-icon/">This post from Michael Tsai</a> has documented reactions and tips regarding this change over the last year — including the fact that in the MacOS 12 Monterey betas, proxy icons can be turned back on using an Accessibility setting in System Preferences. (If you think Accessibility is just for people with vision or motor skill problems, you’ve been missing out on some great system-wide settings for tweaking both MacOS and iOS.)</p>

<p>Does removing proxy icons from document window title bars reduce “clutter”? I can only assume that’s what Apple’s HI team was thinking. But I’d argue strenuously that proxy icons aren’t needless clutter — they’re <a href="http://hints.macworld.com/article.php?story=2010031117415674">useful</a>, and showing them by default made them discoverable. Keeping them visible reminds you that they’re there. There’s a one-to-one relationship between a document icon in the Finder and the open application window for that document; showing the document icon in the window title bar reinforced that concept. <a href="https://twitter.com/chucker/status/1395843084383043584">This hidden Finder preference for MacOS 11 Big Sur</a> delights me, because in addition to showing proxy icons, it also restores grabbable title bars in MacOS 11.</p>

<p>In a sense, no personal computer interface can out-minimalize an old terminal command line — just a blinking cursor on a black screen, awaiting your commands. The Mac’s breakthrough was establishing an interface where you could see — and thus discover through visual exploration — not just what you <em>had</em> done, but what you <em>could</em> do. Proxy icons in title bars weren’t added to classic Mac OS until version 8.5 in 1998, but they exemplified that philosophy. They said: <em>Even though this document is open in an editing window, you can still do things with the file — here it is.</em></p>

<p>It’s devilishly hard work deciding what to expose at the top level of a user interface. Microsoft went overboard <a href="https://docs.microsoft.com/en-us/windows/win32/uxguide/cmd-ribbons">for decades of versions of Windows</a> with <a href="http://www.newdesignfile.com/post_microsoft-office-toolbar-icons_80811/">way too many</a> inscrutable <a href="http://drops.caseyliss.com/VC9qbu">tiny toolbar icons</a>. But like almost every design challenge, it’s a Goldilocks problem — you can go too far in the other direction, and there is no “just right” that will please everyone.</p>



    ]]></content>
  <title>★ Document Proxy Icons in MacOS 11 and 12 as a — Ahem — Proxy for Apple’s Current UI Design Sensibilities</title></entry><entry>
    
    <link rel="alternate" type="text/html" href="https://daringfireball.net/2021/07/69_dudes" />
	<link rel="shorturl" href="http://df4.us/tj5" />
	<id>tag:daringfireball.net,2021://1.38273</id>
	<published>2021-07-13T22:28:52Z</published>
	<updated>2021-07-13T22:28:53Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<summary type="text">Sometimes a cigar is just an integer math conversion glitch.</summary>
	<content type="html" xml:base="https://daringfireball.net/" xml:lang="en"><![CDATA[
<p>A good mid-summer silly story from earlier today. Chaim Gartenberg, writing at The Verge, “<a href="https://www.theverge.com/tldr/2021/7/13/22575368/apple-ios-14-weather-app-69-rounding-error-15">Apple’s Weather App Won’t Say It’s 69 Degrees</a>”:</p>

<blockquote>
  <p>If you’re an iPhone user, the weather is always a particularly
nice 70 degrees. Or 68 degrees. Any temperature but 69 degrees,
actually, because it turns out that the built-in weather app on
some versions of iOS — including the current version, iOS 14.6 — will refuse to display <a href="https://nymag.com/intelligencer/2016/06/why-69-is-the-internets-coolest-number-sex.html">the internet’s favorite number</a>, even
if the actual temperature in a given location is, in fact, 69
degrees, along with several other (less meme-able) numerals like
65 and 71 degrees.</p>

<p>It’s not clear if this is a bug or an intentional attempt from
Apple to cut down on 69-related humor. The rounding is only
visible in the weather app itself: clicking through to Apple’s
source data from Weather.com will show the proper temperature, as
do Apple’s home screen widgets. But the iOS weather app will
refuse to show 69 degrees anywhere in the forecast, whether it’s
for the current temperature, the hourly forecast for the day, or
the extended forecast.</p>
</blockquote>

<p>Marques Brownlee followed with <a href="https://twitter.com/MKBHD/status/1414974137332867072">a quick side-by-side demo</a> with an Android phone. But it was soon pointed out by commenters on Twitter that while true for the Weather app in iOS 14.6, it’s not the case in the current betas for iOS 15. (It’s also not the case for iOS 13, which I still have running on a spare phone.) Gartenberg soon updated his story at The Verge with the following:</p>

<blockquote>
  <p>A possible explanation for the issue (as <a href="https://twitter.com/theMarcDufresne/status/1414981789052030987">pointed out by
several</a> <a href="https://twitter.com/nannerb/status/1414981582318878722">people on Twitter</a>) is that Apple may be
sourcing data for its iOS Weather app in Celsius and then
converting it to Fahrenheit. For example, 20 degrees Celsius
converts to 68 degrees Fahrenheit, while 21 degrees Celsius
converts to 69.8 degrees Fahrenheit — which rounds up to 70
degrees Fahrenheit. The app appears to have similar issues with
temperatures like 65 degrees (where 18 degrees Celsius converts to
64.4 degrees Fahrenheit, while 19 degrees Celsius is 66.2 degrees
Fahrenheit).</p>
</blockquote>

<p>This theory that it’s a side effect of converting Celsius integer values to Fahrenheit integer values strikes me as almost certainly correct — especially considering that it affects un-notable values like “65”. Or that even in iOS 14.6, <em>negative</em> 69°F <a href="https://twitter.com/largent_connor/status/1414976667219542016">displays just fine</a>. But it’s amusing to me that so many people bought into the possibility that someone at Apple thought it was a good idea to avoid showing 69° as a temperature.</p>

<p>Apple’s Compass app will show you 69°. The Finder will tell you if you have 69 files in a folder. Once you start down this path it’s hard to find an app from Apple that <em>won’t</em> display “69” some how, some way, if that’s the value that ought to be displayed. Apple even has <a href="https://www.techspot.com/news/67429-apple-replace-single-lost-or-broken-airpod-69.html">products that cost $69</a>.</p>

<p>But Apple’s reputation for prudishness precedes it.</p>

<p>What didn’t pass the sniff test for me with this “won’t show 69°F” idea is that it would cross the line into losing integrity, or at least losing <em>accuracy</em>. Can I imagine a third-party weather app being rejected from the App Store because its screenshots show a big “69°F” current temperature? Yes. But to program the iPhone Weather app to avoid displaying 69°F when it really is 69°F? (Or to demand a third-party weather app not show “69°F” in the app?) No.</p>

<p>Sometimes a cigar is just an integer math conversion glitch.</p>

<hr />

<p>I’m reminded of the spate of articles a few years ago, when Apple’s original TV+ titles were ramping up production, that Apple executives were squeamish about R-rated content. E.g. <a href="https://www.wsj.com/articles/no-sex-please-were-apple-iphone-giant-seeks-tv-success-on-its-own-terms-1537588880">this widely-cited report</a> by Tripp Mickle and Joe Flint for The Wall Street Journal in September 2018, which claimed, “The tech giant wants to make scripted shows for streaming, only without violence, politics and risqué story lines.” It didn’t seem preposterous in the least that Apple might have been looking for a Disney-esque “family-friendly only” image for its original content.</p>

<p>Problem is: <a href="https://daringfireball.net/linked/2020/02/04/cue-ny-post">it wasn’t true</a>. <em>Ted Lasso</em> sure is a feel-good show, but Apple’s acclaimed <em>The Morning Show</em> is just as surely not. <em>Servant</em> is R-rated horror (or pretty close to R-rated). <em>See</em> was a show about a future world <a href="https://www.esquire.com/entertainment/tv/a29637626/see-apple-tv-masturbation-scene-queen-kane/">where everyone is blind and they pray to their god by masturbating</a>. Disney+ probably wasn’t bidding on that.</p>



    ]]></content>
  <title>★ If You Guys Are Really Us, What Number Are We Thinking Of?</title></entry><entry>
    
    <link rel="alternate" type="text/html" href="https://daringfireball.net/2021/07/safari_15_public_betas_for_mac_and_ios" />
	<link rel="shorturl" href="http://df4.us/tio" />
	<id>tag:daringfireball.net,2021://1.38256</id>
	<published>2021-07-02T19:09:39Z</published>
	<updated>2021-07-19T18:40:04Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<summary type="text">One can only presume that Apple’s HI team thinks they’re reducing needless “clutter”, but what they’re doing is systematically removing the coherence between what apps look like and the functionality they offer.</summary>
	<content type="html" xml:base="https://daringfireball.net/" xml:lang="en"><![CDATA[
<p><a href="https://mjtsai.com/blog/2021/06/17/safari-15/">Michael Tsai</a>:</p>

<blockquote>
  <p>I think I like the changes for iPhone. The controls are easier to
reach at the bottom of the screen, and it’s quicker to switch
between tabs.</p>
</blockquote>

<p>I get the move to the bottom, in theory — clearly this is about reachability. But I use Safari on my iPhone <em>a lot</em> and I have never minded using a second hand to get to the controls that, heretofore, were at the top: the “ᴀA” menu, the location field, and the reload/stop button. </p>

<p>Here are screenshots from Safari on iOS 14.6:</p>

<p><a href="/misc/2021/06/ios-safari-14-6.png" class="noborder">
  <img
    src = "/misc/2021/06/ios-safari-14-6.png"
    alt = "Screenshot of mjtsai.com in Safari on iOS 14.6."
    width = 450
  /></a></p>

<p>and iOS 15 beta 2:</p>

<p><a href="/misc/2021/06/ios-safari-15b2.png" class="noborder">
  <img
    src = "/misc/2021/06/ios-safari-15b2.png"
    alt = "Screenshot of mjtsai.com in Safari on iOS 14.6."
    width = 450
  /></a></p>

<p>Both the old and new designs put these controls one tap away: back/forward, location field, and the tabs button.</p>

<p>The only other one-tap control in the new design is the “···” <s>junk drawer</s> menu button, which can be long-pressed to toggle Reader Mode. All the other controls are inside the “···” popover menu.</p>

<p>The old design has no “···” menu because it doesn’t need one. It has an “ᴀA” button at the top which can be long-pressed to toggle Reader Mode and when tapped shows a popover menu of site-specific viewing options. At the bottom it has one-tap buttons for Share and Bookmarks. I use the Share and Bookmarks buttons <em>all the time</em> on my iPhone.</p>

<p>The system-wide standard iOS/iPadOS Share popover menu is one of the best UIs Apple has come up with in the last decade. It is extremely useful, very well supported by both first- and third-party apps, and extraordinarily <em>consistent</em> across the entire system. Because it is widely supported and very consistent, it is well understood by users. I realize that the nature of my work is such that I deal with URLs more frequently than most people, but sharing URLs is really common.</p>

<p>I also think the “ᴀA” button is a much better idea than putting all the options previously contained therein in the catch-all “···” menu. Long-pressing “ᴀA” to toggle Reader Mode feels intuitive; long-pressing “···” to toggle Reader Mode feels like they <a href="https://twitter.com/viticci/status/1402746553060806659">just didn’t know where else to put it</a>. The new iOS Safari “···” menu <a href="https://pxlnv.com/linklog/wwdc-discoverable-design/">could have been a “here’s what <em>not</em> to do” example</a> from Apple’s own <a href="https://developer.apple.com/videos/play/wwdc2021/10126/?time=287">WWDC session this year on “Discoverable Design</a>”.</p>

<p>Bookmarks are almost completely lost in the new design, and unless I’m missing something, there’s no longer any way to run bookmarklets. I know bookmarklets are an old-school web nerd thing, but I have a few I use frequently, which, if Apple sticks with this design for the next year, I guess I’ll have to rewrite as Shortcuts shortcuts or something.<sup id="fnr1-2021-07-02"><a href="#fn1-2021-07-02">1</a></sup></p>

<p>The only new thing the new iOS Safari design has going for it is that you can swipe side-to-side on the floating browser chrome at the bottom to switch between tabs. I don’t think that is significantly more convenient than tapping the Tabs buttons to switch tabs. How often you want to swipe through tabs one at a time rather than <em>see</em> your tabs and select one in particular? And if you swipe just a little bit too low, you wind up switching between <em>apps</em>, not tabs.</p>

<p>All that said, I agree with Tsai that the new Safari for Mac is even worse:</p>

<blockquote>
  <p>For Mac, the new design makes no sense to me, and I’ll likely
switch to Chrome if it can’t be disabled:</p>

<ul>
<li>Not only does the location bar <a href="https://twitter.com/mattbirchler/status/1405348487546429448">move</a> when you change tabs,
but, because it changes width, all the other tabs move, too. It
feels disorienting.</li>
<li>With everything on one line, there’s less space for tab text
than before.</li>
<li>It’s harder to get at buttons and extensions <a href="https://twitter.com/viticci/status/1402743028536819718">hidden</a> under
the <a href="https://twitter.com/siracusa/status/1402715575449686016">… menu</a>.</li>
<li>There’s less empty space where it’s safe for me to click in
order to drag the window.</li>
<li>Having the page background color bleed into the tab area makes
it harder to read, and it feels weird for the current page’s
color to affect the way <em>other</em> tabs look. It also works
inconsistently, even on the same pages on Apple’s site. At least
there’s a preference to turn it off.</li>
</ul>
</blockquote>

<p>You don’t have to install MacOS 12 Monterey to use the new Safari design; the latest versions of <a href="https://developer.apple.com/safari/technology-preview/">Safari Technology Preview</a> have it too, and Safari Technology Preview is installed as a separate app, not a replacement for the current version of Safari.</p>

<p>Tabs in Safari on Mac (and, in my opinion, iPad) were a solved problem. The new Safari tab UI strikes me as being different for the sake of being different, not different for the sake of being better. The new design certainly makes Safari look distinctive. But is it more usable or discoverable in <em>any</em> way? I honestly can’t think of a single problem the new design solves other than saving about 30 points (60 @2× pixels) of vertical screen space by omitting a dedicated tab bar. But I think the tab bar was space put to good, obvious use with traditional tabs.
<a href="https://birchtree.me/blog/safari-15-what-you-gain-and-at-what-cost/">Matt Birchler points out</a> that horizontally, the new tab design uses space <em>less</em> efficiently. Good luck convincing Chrome users to switch to Safari with this design. Not to mention that every other tabbed app in MacOS 12 still uses a traditional tab bar. It’s consistent neither with other popular web browsers nor with the rest of MacOS 12.</p>

<p><a href="https://pxlnv.com/blog/safari-15-chickenshit-minimalism/">Nick Heer, writing at Pixel Envy</a>:</p>

<blockquote>
  <p>Over the past several releases of MacOS and iOS, Apple has
experimented with hiding controls until users hover their cursor
overtop, click, tap, or swipe. I see it as an extension of what
<a href="https://idlewords.com/talks/website_obesity.htm#minimalism">Maciej Cegłowski memorably called</a> “chickenshit minimalism”.
He defined it as “the illusion of simplicity backed by megabytes
of cruft”; I see parallels in a “junk drawer” approach that
prioritizes the appearance of simplicity over functional clarity.
It adds complexity because it reduces clutter, and it allows UI
designers to avoid making choices about interface hierarchy by
burying everything but the most critical elements behind vague
controls.</p>

<p>If UI density is a continuum, the other side of chickenshit
minimalism might be something like Microsoft’s <a href="https://en.wikipedia.org/wiki/Ribbon_(computing)#Microsoft_software">“ribbon”
toolbar</a>. Dozens of controls of various sizes and types,
loosely grouped by function, and separated by a tabbed UI
creates a confusing mess. But being unnecessarily reductionist
with onscreen controls also creates confusion. I do not want
every web browser control available at all times, but I cannot
see what users gain by making it harder to find the reload
button in Safari.</p>
</blockquote>

<hr />

<p>There’s an axiom widely (but alas, probably <a href="https://quoteinvestigator.com/2011/05/13/einstein-simple/">spuriously</a>) attributed to Albert Einstein: “Everything should be as simple as possible, but not simpler.” But I don’t even think that applies to this new Safari design. It’s worse. It just <em>looks</em> simpler. All the old functionality remains — it’s just harder to access, harder to discover intuitively, and more distracting. One can only presume that Apple’s HI team thinks they’re reducing needless “clutter”, but what they’re doing is systematically removing the coherence between what apps look like and the functionality they offer.</p>

<p>Here’s another axiom, <a href="https://daringfireball.net/linked/2007/01/23/how-it-works">whose attribution is certain</a>: “Most people make the mistake of thinking design is what it looks like. People think it’s this veneer — that the designers are handed this box and told, ‘Make it look good!’ That’s not what we think design is. It’s not just what it looks like and feels like. Design is how it works.”</p>

<div class="footnotes">
<hr />
<ol>

<li id="fn1-2021-07-02">
<p>“AppleScript scripts” has always felt a little repetitively awkward, but talking about shortcuts in Shortcuts is worse. I wish Apple had called them “workflows” or something instead. I might use that here at DF when I’d otherwise write “Shortcuts shortcuts” though.&nbsp;<a href="#fnr1-2021-07-02"  class="footnoteBackLink"  title="Jump back to footnote 1 in the text.">&#x21A9;&#xFE0E;</a></p>
</li>

</ol>
</div>



    ]]></content>
  <title>★ Regarding the Safari 15 Public Betas for Mac and iOS</title></entry><entry>
    
    <link rel="alternate" type="text/html" href="https://daringfireball.net/2021/06/annotating_apples_anti-sideloading_white_paper" />
	<link rel="shorturl" href="http://df4.us/ti6" />
	<id>tag:daringfireball.net,2021://1.38238</id>
	<published>2021-06-23T21:47:23Z</published>
	<updated>2021-06-25T12:33:49Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<summary type="text">I remain convinced Apple wouldn’t be facing these regulatory pressures today if they’d walked away from a strategy of maximizing App Store profits years ago, and I also think they could largely dissipate these pressures today by doing it now — better late than never.</summary>
	<content type="html" xml:base="https://daringfireball.net/" xml:lang="en"><![CDATA[
<p>Apple today released a white paper arguing against proposed legislation that would mandate the ability to sideload apps (and thereby alternative app stores) on iOS/iPadOS:<sup id="fnr1-2021-06-23"><a href="#fn1-2021-06-23">1</a></sup> “<a href="https://www.apple.com/privacy/docs/Building_a_Trusted_Ecosystem_for_Millions_of_Apps.pdf">Building a Trusted Ecosystem for Millions of Apps</a>”.<sup id="fnr2-2021-06-23"><a href="#fn2-2021-06-23">2</a></sup> I think it’s good, fair, and cogent. I highly encourage you to read it — it’s not long — then come back for my annotations below.</p>

<p>The paper opens with this quote from Steve Jobs, <a href="https://tidbits.com/2007/10/17/steve-jobss-iphone-sdk-letter/">announcing the iPhone SDK</a>:<sup id="fnr3-2021-06-23"><a href="#fn3-2021-06-23">3</a></sup></p>

<blockquote>
  <p>“We’re trying to do two diametrically opposed things at once:
provide an advanced and open platform to developers while at the
same time protect iPhone users from viruses, malware, privacy
attacks, etc. This is no easy task.” — Steve Jobs, 2007</p>
</blockquote>

<p>As ever, Steve Jobs was a succinct and forceful communicator. That “diametrically opposed” tension he described at the outset, 14 years ago, remains exactly the core of Apple’s argument in this paper today.</p>

<p>Page 4, under a section subtitled “This approach to security and privacy has been highly effective”:</p>

<blockquote>
  <p>Additionally, even users who prefer to only download apps from the
App Store could be forced to download an app they need for work or
for school from third-party stores if it is not made available on
the App Store. Or they could be tricked into downloading apps from
third-party app stores masquerading as the App Store.</p>
</blockquote>

<p>This, to me, is perhaps <em>the</em> key point that sideloading proponents ignore. Arguments in favor of allowing sideloading on iOS, from users, tend to boil down to “<em>It’s my device, I should be allowed to install whatever I want. If most users want to stick with the App Store, that’s fine for them and they’ll keep all the benefits as they currently stand, while I and others will have the freedom to install whatever we want.</em>” That argument is not wrong! There <em>would</em> be benefits to allowing sideloading, exactly along the lines of how there are benefits to being able to install apps outside the App Store via TestFlight, enterprise distribution, and compiling apps from source code with Xcode.</p>

<p>Sideloading would take things to a new level though. TestFlight still requires some approval from Apple, and TestFlight distribution is limited to 10,000 users. Enterprise distribution requires an enterprise certificate from Apple. And compiling from source code requires a developer account, significant technical expertise, and, well, the source code to the app.</p>

<p>What the sideloading arguments ignore are the enormous tradeoffs involved. Yes, there would be benefits — a lot of cool apps that aren’t permitted in the App Store would be installable by as many iOS users as want to install them. But many non-technical users would inevitably wind up installing undesirable apps via work/school requirements or trickery that they could not be required or tricked into installing today. Consider just the example of “proctoring apps” that students are required to install for remote test taking. They’re a surveillance menace, <a href="https://www.eff.org/deeplinks/2020/08/proctoring-apps-subject-students-unnecessary-surveillance">as the EFF reported in August</a>.</p>

<p>Technically, yes, on platforms that allow it, sideloading is the user’s choice. But socially and psychologically, it often isn’t.<sup id="fnr4-2021-06-23"><a href="#fn4-2021-06-23">4</a></sup></p>

<p>Page 4:</p>

<blockquote>
  <p>In the end, users would have to constantly be on the lookout for
scams, never knowing who or what to trust, and as a result many
users would download fewer apps from fewer developers.</p>
</blockquote>

<p>This is another key point that cannot be overstated. As things stand today, you cannot “mess up” your iOS device by installing the wrong software. You can easily uninstall all traces of any app you do install with a tap-and-hold on the app’s icon. No app you install can <a href="https://chromeisbad.com/">entrench invisible background agents that act like system software</a>. And because of this, hundreds of millions of non-technical iOS users install far more software on their iOS devices than they do or did on their PCs — <em>including Macs</em>. This, despite the fact that PCs are far more powerful devices. Typical users install more apps on their less capable phones than they do on their far more capable PCs. This is as close as we can get to proof that Apple’s App Store model on iOS hasn’t just worked, but has proven to be wildly successful <em>and popular with users</em>.</p>

<p>Related point: An app’s ability to even <em>request</em> access to health data, or contacts, or to create a VPN, rests on App Store review. If an app says it’s a game but requests the entitlement to prompt the user for access to health data, Apple’s App Store review will reject it. An Epic-run App Store would be making parallel and different decisions about which entitlements to grant to which apps. A sideloaded app would make those decisions for itself. Surveillance tracking would go back to “whatever the app wants to do”.</p>

<p>Page 9:</p>

<blockquote>
  <p>iPhone is used every day by over a billion people — for banking,
to manage health data, and to take pictures of their families.
This large user base would make an appealing and lucrative target
for cybercriminals and scammers, and allowing sideloading would
spur a flood of new investment into attacks on iPhone, well beyond
the scale of attacks on other platforms like Mac.</p>
</blockquote>

<p>Here Apple dances around the elephant in the room — the question of why iOS shouldn’t just work like the Mac with regard to non-App Store software. Apple’s deft argument is that there are far fewer Macs than iOS devices, making the Mac a less enticing target for scammers and crooks (including privacy crooks). That’s more or less the argument Windows proponents used to explain the profound prevalence of malware on Windows compared to the Mac back in the day, whilst Apple (and Mac proponents) argued otherwise, that the Mac actually was far more secure at a technical level.</p>

<p>But the truth Apple won’t come out and say is that it’s <em>both</em>. The Mac <em>was</em> more secure by design, but <em>also</em> a far less enticing target because of how many more users were (and still are) on Windows. And, today, iOS <em>is</em> more secure and private than the Mac. That’s the nature of the Mac as a full PC platform.</p>

<p>I’ll admit it: if Mac-style sideloading were added to iOS, I’d enable it, for the same reason I enable installing apps from outside the App Store on my Mac: I trust myself to only install trustworthy software. But it doesn’t make me a hypocrite to say that I think it would be worse for the platform as a whole.<sup id="fnr5-2021-06-23"><a href="#fn5-2021-06-23">5</a></sup></p>

<p>The Mac is fundamentally designed for users who are at least <em>somewhat</em> technically savvy, but tries its best to keep non-savvy users from doing things they shouldn’t. But you can always hurt yourself, sometimes badly, with any true power tool. The iPhone is the converse: designed first and foremost for the non-savvy user, and tries to accommodate power users as best it can within the limits of that primary directive.</p>

<p>Page 11:</p>

<blockquote>
  <p><em>The goal of App Review is to ensure that apps on the App Store
are trustworthy</em> and that the information provided on an app’s App
Store page accurately represents how the app works and what data
it will access. We are constantly improving this process: we
update and refine our tools and our methodology continuously.</p>
</blockquote>

<p>The problem Apple is facing today is that it’s clear that one word in the above is inaccurate: the opening “the”. The above is <em>a</em> goal of the App Store — and I would argue that it remains the <em>primary</em> goal. But clearly the App Store serves another goal for Apple: making the company money. Exhibit A: <a href="https://daringfireball.net/2020/06/hey_app_store_rejection_flimsiness">last year’s Hey fiasco</a>. Nothing about Apple’s rejection of Hey (or, I’d wager, some number of <em>thousands</em> of other apps flagged by App Store review for similar reasons) was about trustworthiness. It was about money.</p>

<p>That’s a conflict of interest, and it detracts significantly from Apple’s entirely legitimate trustworthiness argument defending the App Store model for distribution. I remain convinced Apple wouldn’t be facing these regulatory pressures today <a href="https://daringfireball.net/2021/06/app_store_the_schiller_cut">if they’d walked away from a strategy of maximizing App Store profits years ago</a>, and I also think they could largely dissipate these pressures today by doing it now — better late than never.</p>

<p>Also on page 11:</p>

<blockquote>
  <p><em>Once users download an app through the App Store, they are able to
control how that app functions and what data it is able to access</em>,
using features such as App Tracking Transparency and permissions.
Parents can further control what their kids buy with the Ask to
Buy feature, how much time they spend on certain categories of
apps with Screen Time features, and what data they share. Users
are also able to centrally manage all app-related payments, and
are able to easily view and cancel subscriptions that are paid for
via In-App Payments. These controls could not be fully enforced on
sideloaded apps.</p>
</blockquote>

<p>All of this is true. But that last point, that <em>all</em> in-app subscriptions are listed in an obvious location, where it’s easy to unsubscribe, and you get email notifications before every renewal, is the singular reason why I think Apple should not — and should not be forced to — allow in-app purchases and especially subscriptions via developers’ own payment systems. What I endorse is allowing apps to direct users to the web to make purchases and subscriptions. In-app purchases vs. out-app purchases. Let Apple earn its cut by showing that in-app purchases have higher conversions.</p>

<p>My favorite example is The New York Times — by all accounts a reputable and trustworthy company. Subscribe to the Times in-app, where Apple gets a cut, and you can easily unsubscribe at any time with two taps in the Settings apps. Subscribe to the Times on their website, and you literally have to <a href="https://help.nytimes.com/hc/en-us/articles/360003499613-Cancel-your-subscription">call them on the telephone and argue with a Times rep</a> whose job is to talk you out of unsubscribing.</p>

<p>The current in-app purchase requirements are incredibly reassuring to me, as a user. I subscribe to many publications and services through in-app purchase that I would not subscribe to otherwise. Let apps <em>offer</em> the ability to use their own purchasing systems, but make it clear they’re doing so on the web, not in-app. (That’s what Hey does — and people trust Hey because they trust the company behind it.)</p>

<p>Page 12, in a list of statistics of App Store “protections in action in 2020”:</p>

<blockquote>
  <p><em>Apple deactivated 244 million customer accounts due to fraudulent
and abusive activity, including fake reviews</em>. It also rejected
424 million attempted account creations due to fraudulent and
abusive patterns.</p>
</blockquote>

<p>My reaction to these numbers: <em>Jiminy!</em></p>

<p>Assuming these number are accurate, they explain Apple’s seeming nonchalance to the continuing existence of scam apps that do get into the App Store, and the pervasiveness of fraudulent reviews. They’re catching the overwhelming majority of them.</p>

<p>I still say: <a href="https://daringfireball.net/search/bunco+squad">not good enough</a>, especially on the task of identifying and eliminating <em>successful</em> scams. But, still, wow, those are big numbers.</p>

<div class="footnotes">
<hr />
<ol>

<li id="fn1-2021-06-23">
<p>Apple actually only talks about the iPhone in the white paper — the word “iPad” doesn’t appear once. But iPadOS and iOS are exactly the same in every regard discussed in the paper. I think Apple wisely focused on iPhone to keep it simple. I’ll do the same, and write only “iOS” as shorthand for “iOS and iPadOS” (and WatchOS and tvOS, for that matter).&nbsp;<a href="#fnr1-2021-06-23"  class="footnoteBackLink"  title="Jump back to footnote 1 in the text.">&#x21A9;&#xFE0E;</a></p>
</li>

<li id="fn2-2021-06-23">
<p>It’s a PDF, not a web page, which is typical for “white paper” type things. But the biggest downside to publishing it as a PDF is that it’s hard to read on a phone, which feels at least slightly ironic. (Kudos to Apple though for the PDF’s svelte 295 KB file size, despite being illustrated throughout.)&nbsp;<a href="#fnr2-2021-06-23"  class="footnoteBackLink"  title="Jump back to footnote 2 in the text.">&#x21A9;&#xFE0E;︎</a></p>
</li>

<li id="fn3-2021-06-23">
<p>Amusingly, Apple had to source Jobs’s quote to <a href="https://tidbits.com/2007/10/17/steve-jobss-iphone-sdk-letter/">TidBITS’s archived copy</a> of Jobs’s open letter announcing the SDK, because Apple never gave it a permalink at apple.com. In his preface to TidBITS’s hosted copy of the letter, Adam Engst wrote:</p>
<blockquote>
  <p>Some things need to be in the permanent record, and since Apple
didn’t see fit to give a permanent URL to Steve Jobs’s letter
announcing that Apple would be creating an SDK for third party
iPhone native applications, I’m reproducing it below for future
reference.</p>
</blockquote>
<p>Even Apple apparently now agrees the letter belongs in the permanent record.&nbsp;<a href="#fnr3-2021-06-23"  class="footnoteBackLink"  title="Jump back to footnote 3 in the text.">&#x21A9;&#xFE0E;︎</a></p>
</li>

<li id="fn4-2021-06-23">
<p>As an aside, this is why it would be a terrible idea to enrich WebKit into a full technical peer to native apps, or allow alternative web rendering engines empowered with such features, <a href="https://infrequently.org/2021/04/progress-delayed/">as many web developers shortsightedly, and recklessly (and perhaps selfishly) desire</a>. As things stand, WebKit allows users to go anywhere they want on the web, and install any web apps they want as apps on their iOS home screens — but WebKit’s limits are such that they can do so <em>without concern or any degree of technical savviness</em> because WebKit only offers functionality that is safe, secure, and private. Not to mention the fact that a world where any mobile app could be written as a pure web app would inevitably quickly devolve into a world where most apps are identical on iOS and Android, which is neither good for Apple <em>nor</em> for iOS users who prefer truly native iOS apps that fit in with Apple’s system-wide design idioms and integrate with iOS’s unique features.&nbsp;<a href="#fnr4-2021-06-23"  class="footnoteBackLink"  title="Jump back to footnote 4 in the text.">&#x21A9;&#xFE0E;︎</a></p>
</li>

<li id="fn5-2021-06-23">
<p>My spitball idea for sideloading would be for Apple to create a “developer mode” on iOS devices that allows for Mac-style sideloading of apps. Something that requires a <em>paid</em> Apple developer account. No one is going to get tricked or bamboozled into signing up for a $100/year ADC account. And when (not if) some users who enable it wind up installing foolish software, “developer mode” is a pretty good way of saying “you should know better”. And disabling “developer mode” would, if possible, render inert any software on the device installed via this means. Just my spitball.&nbsp;<a href="#fnr5-2021-06-23"  class="footnoteBackLink"  title="Jump back to footnote 5 in the text.">&#x21A9;&#xFE0E;︎</a></p>
</li>


</ol>
</div>



    ]]></content>
  <title>★ Annotating Apple’s Anti-Sideloading White Paper</title></entry><entry>
    
    <link rel="alternate" type="text/html" href="https://daringfireball.net/2021/06/pichai_wakabayashi" />
	<link rel="shorturl" href="http://df4.us/thy" />
	<id>tag:daringfireball.net,2021://1.38230</id>
	<published>2021-06-22T00:29:41Z</published>
	<updated>2021-06-22T00:29:42Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<summary type="text">One person’s overcaution is another’s focus.</summary>
	<content type="html" xml:base="https://daringfireball.net/" xml:lang="en"><![CDATA[
<p><a href="https://www.nytimes.com/2021/06/21/technology/sundar-pichai-google.html">Daisuke Wakabayashi, reporting for The New York Times</a>:</p>

<blockquote>
  <p>It is hard to argue that things aren’t going great for Google.
Revenue and profits are <a href="https://www.nytimes.com/2021/04/27/technology/alphabet-google-earnings.html">charting new highs</a> every three
months. Google’s parent company, Alphabet, is worth $1.6 trillion.
Google has rooted itself deeper and deeper into the lives of
everyday Americans.</p>

<p>But a restive class of Google executives worry that the company is
showing cracks. They say Google’s work force is <a href="https://www.nytimes.com/2018/10/31/technology/google-sexual-harassment-walkout.html">increasingly
outspoken</a>. Personnel problems are <a href="https://www.nytimes.com/2020/12/03/technology/google-researcher-timnit-gebru.html">spilling into the
public</a>. Decisive leadership and big ideas have given way to
risk aversion and incrementalism. And some of those executives are
leaving and letting everyone know exactly why.</p>

<p>Fifteen current and former Google executives, speaking on the
condition of anonymity for fear of angering Google and Mr. Pichai,
told The New York Times that Google was suffering from many of the
pitfalls of a large, maturing company — a paralyzing bureaucracy,
a bias toward inaction and a fixation on public perception.</p>
</blockquote>

<p>I think there’s something interesting going on here, but Wakabayashi’s lede is far juicier than the meat of the article warrants. I’d argue that it boils down to the fact that Pichai has transformed Google into a more focused, and perhaps more boring, company, and that his internal critics preferred the old Google culture — one that did things just because they seemed clever or cool, not because they were necessarily strategically useful to the company. <a href="https://daringfireball.net/2013/12/thoughts_on_google_glass">Google Glass</a>, for example.</p>

<p>A comparison to Apple (shocking, coming from me, I know) is apt. Apple has  touted that when it comes to product ideas, <a href="https://www.youtube.com/watch?v=XAEPqUtra6E">they have “a thousand no’s for every yes”</a>. Coincidentally, that WWDC-opening video is from 2013, the same year Google Glass became available. In 2013, Steve Jobs’s death was still a fresh emotional wound. But that “thousand no’s for every yes” mantra wasn’t defining a new Apple, it was clarifying that post-Jobs Apple would remain the same Apple. <a href="https://www.youtube.com/watch?v=H8eP99neOVs">Here’s Jobs at that extraordinary open-question session at WWDC 1997</a>, at the very start of the Apple-NeXT reunification that marks the beginning of modern Apple, explaining that “Focusing is about saying no.”</p>

<p>It seems undeniable that under Pichai, Google is more focused: more no’s, fewer yes’s. The sources in Wakabayashi’s report clearly want more yes’s. Maybe they’re right! Google is quite obviously a different company with a very different culture than Apple. But the results under Pichai, so far, <a href="https://www.wolframalpha.com/input/?i=GOOG+market+cap+24+October+2015+to+21+June+2021">are pretty good</a>.</p>

<p>Here’s one of the examples cited by Wakabayashi:</p>

<blockquote>
  <p>A common critique among current and former executives is that Mr.
Pichai’s slow deliberations often feel like a way to play it safe
and arrive at a “no.”</p>

<p>Google executives proposed the idea of acquiring Shopify as a way
to challenge Amazon in online commerce a few years ago. Mr. Pichai
rejected the idea because he thought Shopify was too expensive,
two people familiar with the discussions said.</p>

<p>But those people said that they had never thought Mr. Pichai had
the stomach for a deal and that the price was a convenient and
ultimately misguided justification. Shopify’s share price has
increased almost tenfold in the last few years. Jason Post, a
Google spokesman, said, “There was never a serious discussion of
this acquisition.”</p>

<p>One former executive said the company’s risk aversion was embodied
by a state of perpetual research and development known internally
as “pantry mode.” Teams will stash away products in case a rival
creates something new and Google needs to respond quickly.</p>
</blockquote>

<p>One person’s overcaution is another’s focus.</p>



    ]]></content>
  <title>★ The New York Times: ‘Sundar Pichai Faces Internal Criticism at Google’</title></entry></feed><!-- THE END -->
`


export default feed